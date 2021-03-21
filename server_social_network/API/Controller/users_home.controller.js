const Users_Home = require('../../Models/users_home.model')
const Users = require('../../Models/users.model')
const Users_Activity = require('../../Models/users_activity.model')
const Following = require('../../Models/following.model')

module.exports.index = async (req, res) => {

    // Get id_user from query
    const id_user = req.query.id_user

    const users_home = await Users_Home.find({ id_user: id_user})

    res.json(users_home)

}

module.exports.post_status = async (req, res) => {

    // Get these information was send from client
    // Phần này dùng để push thông tin của chính user vào database
    const id_user = req.query.id_user

    const id_user_following = ""

    const id_image_post = Math.random().toString()

    const title = req.query.title

    const image_body = req.query.image_body

    const user = await Users.findOne({_id: id_user})

    let data = {
        id_user: id_user,
        id_user_following: id_user_following,
        id_image_post: id_image_post,
        title: title,
        image_body: image_body,
        username_following: user.username,
        like: '0',
        comment: '0',
        image_profile_following: user.image_profile,
        status_like: false
    }

    await Users_Home.create(data)


    // Tiếp theo phần dùng để đẩy cái bài post đó vào 
    // database nhưng mà bên phía những user đang following user mà đăng bài
    const these_users_following = await Following.find({ id_user_following: id_user })

    // duyệt vòng for những user đang following user post bài để thêm mới vào database 
    for (let i = 0; i < these_users_following.length; i++){

        data.id_user = these_users_following[i].id_user
        data.id_user_following = these_users_following[i].id_user_following

        await Users_Home.create(data)

    }


    // Tiếp theo phần này dùng để đẩy cái bài post đó vào
    // database user_activity của chính user
    const list_image = {
        id_image_post: id_image_post,
        title: title,
        image_body: image_body,
    }

    const users_activity = await Users_Activity.findOne({ id_user: id_user })

    if (users_activity){
        users_activity.post = parseInt(users_activity.post) + 1
        users_activity.list_image.push(list_image)

        users_activity.save()
    }else{

        const data_activity = {
            id_user: id_user,
            post: "0",
            followers: "0",
            following: "0",
            list_image: list_image // array
        }

        await Users_Activity.create(data_activity)
    }

}