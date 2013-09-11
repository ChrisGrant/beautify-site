# Beautify.io

The [beautify.io](http://beautify.io) website, built using [Jekyll](http://jekyllrb.com/).

## Dependencies

This project makes use of git submodules for local development.  To pull in the code of the submodules run the following from the root of the project -

	git submodule init
	git submodule update

## Testing locally

The Jekyll website has some good instructions of the required [configuration for Github Pages](http://jekyllrb.com/docs/github-pages/). To preview the site locally use the Jekyll server:

	jekyll serve --baseurl ''

This will server the site at `localhost:4000`.

## Building for release

The build process compiles the less into CSS and optimises the JavaScript code. The build makes use of the `lessc` and `uglify` node modules, both of which need to be installed as command line modules:

	npm install -g less
	npm install -g uglify-js

The project has a simple script that runs the compilation process, simply run the following:
	
	$ build.sh

When all is beautiful, push to `gh-pages`.