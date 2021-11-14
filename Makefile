install:
	yarn install

build:
	yarn run build

run:
	yarn run watch

deploy:
	yarn run deploy

zip:
	rm -f rathunt.zip
	zip -r rathunt.zip . -x@exclude.lst

test:
	yarn run build
	yarn test

docs:
	yarn run docs