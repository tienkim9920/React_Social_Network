const Users = require('../../Models/users.model')
const Users_Activity = require('../../Models/users_activity.model')
const Users_Home = require('../../Models/users_home.model')
const Like = require('../../Models/like.model')
const Comment = require('../../Models/comment.model')

module.exports.index = async (req, res) => {

    // Get id_user

    const id_image_post = req.params.id

    const comments = await Comment.find({ id_image_post: id_image_post })

    res.json(comments)

}

module.exports.post_comment = async (req, res) => {

    // Get id_user, id_image_post, send

    const id_user = req.query.id_user

    const id_image_post = req.query.id_image_post

    const send = req.query.send

    // Đầu tiên là duyệt xem user nào vừa comment và lấy dữ liệu của user đó
    const user_comment = await Users.findOne({ _id: id_user })

    // Tiếp theo là thêm dữ liệu comment vào database comment
    const data = {
        id_image_post: id_image_post,
        id_user: id_user,
        image_profile: user_comment.image_profile,
        username: user_comment.username,
        cmt_user: send
    }

    await Comment.create(data)

    // Tiếp theo tìm đến tất cả những data nào có id_image_post
    const user_home = await Users_Home.find({ id_image_post: id_image_post })

    for (let i = 0; i < user_home.length; i++){

        user_home[i].comment = parseInt(user_home[i].comment) + 1

        user_home[i].save()

    }

    res.send("Thanh Cong")

}