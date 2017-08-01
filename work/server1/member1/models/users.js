//models/users.js
var mongoose = require('mongoose');
var db = require('./db');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    user_id: String,
    user_pw: String,
    user_email: String,
    del_yn: { type: String, default: 'N' }
});

var UserModel = db.model('User', UserSchema);

module.exports = UserModel;