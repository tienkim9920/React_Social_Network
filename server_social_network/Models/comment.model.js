var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_image_post: String,
        id_user: String,
        image_profile: String,
        username: String,
        cmt_user: String,
    }
);

const Comment = mongoose.model('Comment', schema, 'comment');

module.exports = Comment;