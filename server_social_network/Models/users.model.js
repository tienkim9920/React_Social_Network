var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        name: String,
        username: String,
        website: String,
        email: String,
        phone: String,
        password: String,
        image_profile: String
    }
);

const Users = mongoose.model('Users', schema, 'users');

module.exports = Users;