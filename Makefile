SHELL=/bin/bash

### installing

install:
	$(MAKE) npm

clear-cache:
	rm -rf node_modules

npm:
	npm install

### ci / testing

ci:
	npm run lint
	npm run karma

karma:
	npm run karma

karma-ci:
	npm run karma-ci
