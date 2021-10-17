FROM ocaml/opam

RUN opam init --bare -a -y
RUN opam switch create rathunt ocaml-base-compiler.4.06.1
RUN opam install ocaml-lsp-server.1.4.1 ocamlformat react

FROM node:6.9.5-alpine

RUN npm install -g -s --no-progress yarn && \
  yarn && \
  yarn run build && \
  yarn run prune && \
  yarn cache clean

RUN yarn add -D rollup npm-run-all rollup-plugin-node-resolve serve bucklescript-tea
RUN sudo yarn global add bs-platform

COPY . .

CMD yarn run watch

