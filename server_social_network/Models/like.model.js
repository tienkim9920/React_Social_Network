var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_image_post: String,
        id_user: String,
        username: String,
        name: String,
        image_profile: String,
    }
);

const Like = mongoose.model('Like', schema, 'like');

module.exports = Like;