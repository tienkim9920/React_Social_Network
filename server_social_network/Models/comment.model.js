var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_image_post: String,
        id_user: Sring,
        username_user: String,
        cmt_user: String,
    }
);

const Comment = mongoose.model('Comment', schema, 'comment');

module.exports = Comment;