var assert = require('assert');


describe('배열(array) 테스트', function() {
    describe('#indexOf() 테스트', function() {
        it('-1이 리턴 된다!', function() {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
        it('1 + 2 == 3', function() {
            assert.equal(3, 1 + 2);
        });
    });
});