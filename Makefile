SHELL=/bin/bash

### installing

install:
	npm install

clear-cache:
	rm -rf node_modules

### ci / testing

ci:
	npm run lint
	npm run karma

karma:
	npm run karma

karma-ci:
	npm run karma-ci
