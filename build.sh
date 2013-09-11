#!/bin/bash
# Script containing actions to execute before committing
# Assumes dependencies are installed: lessc, uglify

# compile the CSS
echo 'lessc style.less > style.css'
lessc style.less > style.css
echo ''

# tidy up the JS
echo 'uglifyjs scripts/svgeezy.js scripts/modernizr.custom.js scripts/jquery-1.10.2.min.js bootstrap/js/transition.js bootstrap/js/collapse.js --mangle --compress > script.js'
uglifyjs scripts/svgeezy.js scripts/modernizr.custom.js scripts/jquery-1.10.2.min.js bootstrap/js/transition.js bootstrap/js/collapse.js --mangle --compress > script.js
