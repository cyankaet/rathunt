FROM ocaml/opam

FROM node:6.9.5-alpine

RUN npm install -g -s --no-progress yarn && \
  yarn && \
  yarn run build && \
  yarn run prune && \
  yarn cache clean

COPY . .

CMD yarn start

