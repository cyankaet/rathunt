# FROM ocaml/opam

# RUN opam init --bare -a -y
# RUN opam switch create rathunt ocaml-base-compiler.4.06.1
# RUN opam install ocaml-lsp-server.1.4.1 ocamlformat react
# RUN eval $(opam env)

FROM node:16-alpine
ENV NINJA_DEPS \
  python3 \
  g++ \
  make

RUN apk add --update --no-cache --virtual .build-deps ${NINJA_DEPS} && \
  ln -sf python3 /usr/bin/python

WORKDIR /usr/app
COPY . .

RUN yarn install

RUN yarn run build 

CMD yarn run watch

