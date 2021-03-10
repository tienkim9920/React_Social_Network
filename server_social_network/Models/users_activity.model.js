var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_user: String,
        post: String,
        followers: String,
        following: String,
        list_image: Array,
    }
);

const Users_Activity = mongoose.model('Users_Activity', schema, 'users_activity');

module.exports = Users_Activity;