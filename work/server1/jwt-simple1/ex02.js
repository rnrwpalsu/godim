var jwt = require('jwt-simple');
var body = { name: '피카츄', id: 'pika', email: 'pika@aaa.com' }
var secret = 'manners makes man';

var token = jwt.encode(body, secret);
console.log('token : ', token);

var decoded = jwt.decode(token, secret);
console.log(decoded);