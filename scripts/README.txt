npm install -g uglify-js

uglifyjs scripts/svgeezy.js scripts/modernizr.custom.js scripts/jquery-1.10.2.min.js bootstrap/js/transition.js bootstrap/js/collapse.js --mangle --compress > script.js