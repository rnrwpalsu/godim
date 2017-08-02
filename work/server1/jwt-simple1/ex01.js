var jwt = require('jwt-simple');
var payload = { foo: 'bar' };
var secret = 'xxx';

// HS256 secrets are typically 128-bit random strings, for example hex-encoded:
// var secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex)

// encode
var token = jwt.encode(payload, secret);
console.log("token : ", token);

//token :  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIifQ.yPmf5QFV26W-3ld
//VCrsvRdnecy7QjA0fnCWCDLDZ-M4
//{ foo: 'bar' }

// decode
var decoded = jwt.decode(token, secret);
console.log(decoded); //=> { foo: 'bar' }