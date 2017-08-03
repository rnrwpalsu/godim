var assert = require('assert');
var Browser = require('zombie');
var app = require('../app');

describe('index 테스트', function() {
    describe("welcome", function() {
        it('page OK', function(done) {
            var browser = new Browser();
            browser.visit("http://localhost:3000", function() {
                assert.ok(browser.success, 'page load');
                done();
            });
        });
    });
});