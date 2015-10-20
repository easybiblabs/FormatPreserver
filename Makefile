SHELL=/bin/bash

# some commands need sudo on linux, but not on macs, or travis
# (see .travis.yml)
export NODE_MODULES=./node_modules/.bin/
export KARMA=$(NODE_MODULES)karma
export GULP=$(NODE_MODULES)gulp

### installing / building

install:
	$(MAKE) npm

clear-cache:
	rm -rf node_modules

npm:
	npm install

### ci / testing

ci:
	$(GULP) lint
	$(MAKE) karma

karma:
	$(KARMA) start karma.conf.js --single-run

karma-ci:
	$(KARMA) start
