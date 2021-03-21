var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_user: String,
        id_user_another: String,
        username_another: String,
        image_profile: String,
        id_image_post: String,
        image_body: String,
        status: Boolean,
        category: Boolean
    }
);

const Favorite = mongoose.model('Favorite', schema, 'favorite');

module.exports = Favorite;