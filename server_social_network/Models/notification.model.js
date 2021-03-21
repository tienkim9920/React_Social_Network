var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_user: String,
        id_user_another: String,
        username_another: String,
        image_profile_another: String,
        status: Boolean
    }
);

const Notification = mongoose.model('Notification', schema, 'notification');

module.exports = Notification;