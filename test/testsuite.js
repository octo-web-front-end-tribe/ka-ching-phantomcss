var phantomcss = require('./../phantomcss.js');

phantomcss.init({
    mismatchTolerance: 1
});

var welcomePageURL = 'http://localhost:3000';

casper.start('/');

casper.viewport(1024, 1024);

casper.thenOpen(welcomePageURL, function () {
    phantomcss.screenshot('body', 'whole login page');
});

casper.then(function fill_in() {

    this.fill('form[name="loginForm"]', {
        'login': 'john.doe',
        'password': 'foobar'
    });
    this.click('button[type="submit"]');
    this.wait(5000, function () {
        phantomcss.screenshot({top: 0, left: 0, width: 1024, height: 700}, 'whole home page');
    });
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

