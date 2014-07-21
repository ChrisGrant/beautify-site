# Beautify.io

The [beautify.io](http://beautify.io) website, built using a combination of [Grunt](http://gruntjs.com/) and [Jekyll](http://jekyllrb.com/). Currently the site is being served at [beautify.github.io/beautify-site](http://beautify.github.io/beautify-site/).

## Dependencies

This project makes use of [npm](https://www.npmjs.org/) dependencies for local development.  To build, ensure [Node](http://nodejs.org/) is installed, and then run:

	npm install
    npm install grunt-cli

## Testing locally

To build the site locally, run the [Grunt](http://gruntjs.com/) dev build:

    grunt dev

Open up the `build/index.html` file, and you should see the beautify site.

## Building for release

The build process, amongst other things, compiles the less into CSS and optimises the JavaScript code:

	grunt build

Open up the `build/index.html` file, and you should see the beautify site. Test that it works with the optimised JavaScript code and that the website looks ready to release.

Once you are happy, run:

	grunt release

This will publish whatever is in the `build` directory to the gh-pages branch, and it should appear on [beautify.io](http://beautify.io/) site within 10 minutes.
