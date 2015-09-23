var phantomcss = require('./../phantomcss.js');

phantomcss.init({
  mismatchTolerance: 1
});

var welcomePageURL = 'http://localhost:3000';

casper.start('/');

casper.viewport(1024, 1024);

casper.thenOpen(welcomePageURL, function () {
  phantomcss.screenshot('body', 'whole welcome page');
});

casper.then(function now_check_the_screenshots() {
  phantomcss.compareAll();
});

casper.then(function end_it() {
  casper.test.done();
});

/*
 Casper runs tests
 */
casper.run(function () {
  console.log('\nTHE END.');
  phantom.exit(phantomcss.getExitStatus());
});

