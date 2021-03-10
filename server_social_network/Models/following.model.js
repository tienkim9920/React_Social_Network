var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_user_following: String,
        id_user: String
    }
);

const Following = mongoose.model('Following', schema, 'following');

module.exports = Following;