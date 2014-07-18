# Beautify.io

The [beautify.io](http://beautify.io) website, built using a combination of [Grunt](http://gruntjs.com/) and [Jekyll](http://jekyllrb.com/). Currently the site is being served at [beautify.github.io/beautify-site](http://beautify.github.io/beautify-site/).

## Dependencies

This project makes use of [npm](https://www.npmjs.org/) dependencies for local development.  To build, ensure [Node](http://nodejs.org/) is installed, and then run:

	npm install
    npm install grunt-cli

## Testing locally

The first step of building the site locally is to run the [Grunt](http://gruntjs.com/) dev build:

    grunt dev

The Jekyll website has some good instructions of the required [configuration for Github Pages](http://jekyllrb.com/docs/github-pages/). To preview the site locally use the Jekyll server:

    jekyll serve --baseurl ''

This will server the site at `localhost:4000`.

## Building for release

The build process, amongst other things, compiles the less into CSS and optimises the JavaScript code:

	grunt build

When all is beautiful, push to `gh-pages`.