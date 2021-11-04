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

tests:
	yarn run build
	yarn test