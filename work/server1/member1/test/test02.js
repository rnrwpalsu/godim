var assert = require('assert');
var Browser = require('zombie');
var app = require('../app'); //서버를 띄우고 테스트하려면 주석처리

describe('로그인 테스트', function() {
    it('아이디/비번 틀린 경우 테스트', function(done) {
        var browser = new Browser();
        browser.visit("http://localhost:3000/users/login", function() {
            browser.fill('input[name=id]', 'hong');
            browser.fill('input[name=pw]', 'a');
            browser.pressButton('#login', function(err) {
                if (err) throw err;
                assert.equal(browser.location.pathname, '/users/login');
                done();
            });
        });
    });
});