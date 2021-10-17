# FROM ocaml/opam




# RUN opam init --bare -a -y
# RUN opam switch create rathunt ocaml-base-compiler.4.06.1
# RUN opam install ocaml-lsp-server.1.4.1 ocamlformat react
# RUN eval $(opam env)

FROM node:16-alpine

WORKDIR /usr/app
COPY package.json /usr/app

RUN npm install yarn 
RUN yarn install

RUN yarn run build 

# RUN yarn run prune 
# RUN yarn cache clean

# RUN yarn add -D rollup 
# RUN yarn add -D npm-run-all 
# RUN yarn add -D rollup-plugin-node-resolve
# RUN yarn add -D serve
# RUN yarn add -D bucklescript-tea
# RUN sudo yarn global add bs-platform


# CMD yarn run watch

