# Beautify.io

the [beautify.io](http://beautify.io) website

## Build Instructions

This project makes use of git submodules for local development.  To pull in the code of the submodules run the following from the root of the project -

	git submodule init
	git submodule update

Build prep depends on lessc, uglify and jekyll.

## Testing locally

The Jekyll website has some good instructions of the required [configuration for Github Pages](http://jekyllrb.com/docs/github-pages/). To preview the site locally use teh Jekyll server:

	jekyll serve --baseurl ''

This will server the site at `localhost:4000`.
