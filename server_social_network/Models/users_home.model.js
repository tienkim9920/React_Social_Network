var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_user: String,
        id_user_following: String,
        id_image_post: String,
        title: String,
        image_body: String,
        username_following: String,
        image_profile_following: String,
        like: String,
        comment: String,
        status_like: Boolean
    }
);

const Users_Home = mongoose.model('Users_Home', schema, 'users_home');

module.exports = Users_Home;