var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_user_follower: String,
        id_user: String
    }
);

const Follower = mongoose.model('Follower', schema, 'follower');

module.exports = Follower;