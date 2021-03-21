var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_user: String,
        id_user_follower: String,
    }
);

const Follower = mongoose.model('Follower', schema, 'follower');

module.exports = Follower;