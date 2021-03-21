
const Users_Home = require('../../Models/users_home.model')
const Users = require('../../Models/users.model')
const Users_Activity = require('../../Models/users_activity.model')
const Like = require('../../Models/like.model')
const Favorite = require('../../Models/favorite.model')
const Comment = require('../../Models/comment.model')

module.exports.index = async (req, res) => {

    const id = req.params.id

    const user_activity = await Users_Activity.findOne({ id_user: id })

    res.json(user_activity)

}

module.exports.following = async (req, res) => {

    // Lấy id_user của chính bản thân mình
    const id_user = req.query.id_user

    // Lấy id_user mà mình vừa bấm following
    const id_user_following = req.query.id_user_following

    // Tìm tới những bài đăng của user_home mà mình vừa bấm following
    const user_home = await Users_Home.find({ id_user: id_user_following, id_user_following: "" })


    for (let i = 0; i < user_home.length; i++){

        // Tìm xem thử mình đã từng like bài viết nào của người mà mình bấm follow hay chưa
        const check_like = await Like.findOne({ id_user: id_user, id_image_post: user_home[i].id_image_post })

        // Nếu có like từ trước khi bấm follow thì sẽ là true
        // ngược lại là false
        let flag = false
        if (check_like){
            flag = true
        }
        
        const data = {
            id_user: id_user,
            id_user_following: id_user_following,
            id_image_post: user_home[i].id_image_post,
            title: user_home[i].title,
            image_body: user_home[i].image_body,
            username_following: user_home[i].username_following,
            image_profile_following: user_home[i].image_profile_following,
            like: user_home[i].like,
            comment: user_home[i].comment,
            status_like: flag,
        }

        await Users_Home.create(data)

    }

    res.send("Thanh Cong")
}

module.exports.unfollowing = async (req, res) => {

    // Lấy id_user của chính bản thân mình
    const id_user = req.query.id_user

    // Lấy id_user mà mình vừa bấm following
    const id_user_following = req.query.id_user_following

    // Tìm những bài post mà user mình vừa hủy following đã đăng
    const user_home_post = await Users_Home.find({ id_user: id_user, id_user_following: id_user_following })

    for (let i = 0; i < user_home_post.length; i++){

        user_home_post[i].delete()

    }

    res.send("Thanh Cong")

}

module.exports.detail = async (req, res) => {

    // Lấy id_user của người đăng bài
    const id_user_post = req.query.id_user_post

    // Lấy id_image_post
    const id_image_post = req.query.id_image_post

    const user_home = await Users_Home.findOne({ id_user: id_user_post, id_image_post: id_image_post })

    res.json(user_home)

}


module.exports.delete_post = async (req, res) => {

    // Đầu tiên là xóa trong database users_activity rồi update lại số lượng bài post
    // Get id_user
    const id_user = req.query.id_user

    // Get id_image_post
    const id_image_post = req.query.id_image_post

    const user_activity = await Users_Activity.findOne({ id_user: id_user })

    user_activity.post = parseInt(user_activity.post) - 1

    // Duyệt vòng for để lấy vi trí của bài đăng đó và xóa 
    for (let i = 0; i < user_activity.list_image.length; i++){

        if (user_activity.list_image[i].id_image_post === id_image_post){

            user_activity.list_image.splice(i, 1)
        }

    }

    user_activity.save()

    // Tiếp theo là xóa tất cả những database bên users_home có id_image_post
    await Users_Home.deleteMany({ id_image_post: id_image_post })

    // Tiếp theo là xóa tất cả những database bên like có id_image_post
    await Like.deleteMany({ id_image_post: id_image_post })

    // Tiếp theo là xóa tất cả những database bên favorite có id_image_post
    await Favorite.deleteMany({ id_image_post: id_image_post })

    // Tiếp theo là xóa tất cả những database bên comment có id_image_post
    await Comment.deleteMany({ id_image_post: id_image_post })

    res.send("Thanh Cong")

}