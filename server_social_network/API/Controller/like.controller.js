const Users_Home = require('../../Models/users_home.model')
const Users = require('../../Models/users.model')
const Users_Activity = require('../../Models/users_activity.model')
const Like = require('../../Models/like.model')

module.exports.like = async (req, res) => {

    // Get value from query
    const id_image_post = req.query.id_image_post

    const id_user = req.query.id_user

    const user = await Users.findOne({ _id: id_user })

    // Đầu tiên là thêm nó vào database Like
    const data = {
        id_image_post: id_image_post,
        id_user: id_user,
        username: user.username,
        name: user.name,
        image_profile: user.image_profile,
    }

    await Like.create(data)

    // Tiếp theo tìm đến tất cả những data nào có id_image_post
    const user_home = await Users_Home.find({ id_image_post: id_image_post })

    for (let i = 0; i < user_home.length; i++){

        user_home[i].like = parseInt(user_home[i].like) + 1

        user_home[i].save()

    }


    // Tiếp theo tìm đến user mà đã bấm like bài và update status
    const user_like = await Users_Home.findOne({ id_user: id_user, id_image_post: id_image_post })

    user_like.status_like = true

    user_like.save()

    res.send("Thanh Cong")

}


module.exports.Unlike = async (req, res) => {

    // Get value from query
    const id_image_post = req.query.id_image_post

    const id_user = req.query.id_user    

    // Đầu tiên là tìm tới Like database để xóa
    const like = await Like.findOne({ id_user: id_user, id_image_post: id_image_post })

    like.delete()

    // Tiếp theo tìm đến tất cả những data nào có id_image_post
    const user_home = await Users_Home.find({ id_image_post: id_image_post })

    for (let i = 0; i < user_home.length; i++){

        user_home[i].like = parseInt(user_home[i].like) - 1

        user_home[i].save()

    }


    // Tiếp theo tìm đến user mà đã bấm unlike bài và update status
    const user_like = await Users_Home.findOne({ id_user: id_user, id_image_post: id_image_post })

    user_like.status_like = false

    user_like.save()

}


module.exports.checking = async (req, res) => {

    // Get id_user
    const id_user = req.query.id_user

    const id_image_post = req.query.id_image_post

    const like = await Like.findOne({id_user: id_user, id_image_post: id_image_post})

    if (like){
        res.send("Thanh Cong")
    }else{
        res.send("That Bai")
    }

}


module.exports.Count_Like = async (req, res) => {

    const id_image_post = req.query.id_image_post

    const count_like = await Like.find({ id_image_post: id_image_post })

    res.json(count_like)

}