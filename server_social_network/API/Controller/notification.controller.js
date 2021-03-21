// const Users_Home = require('../../Models/users_home.model')
// const Users_Activity = require('../../Models/users_activity.model')
// const Following = require('../../Models/following.model')

const Users = require('../../Models/users.model')
const Notification = require('../../Models/notification.model')

module.exports.index = async (req, res) => {

    // Get id_user from to query
    const id_user = req.params.id

    const notifications = await Notification.find({ id_user: id_user })

    res.json(notifications)

}

// Hàm này dùng để hiện thông báo khi mình follow người đó thì người đó sẽ hiện thông báo
module.exports.following = async (req, res) => {

    // Get id_user, id_user_another
    const id_user = req.query.id_user

    const id_user_another = req.query.id_user_another

    const user = await Users.findOne({ _id: id_user })

    // Vì mình follow ngta nên nó sẽ hiện thông báo bên phía của đối phương
    // Nên mình sẽ đôi id_user và id_user_another cho nhau
    const data = {
        id_user: id_user_another,
        id_user_another: id_user,
        username_another: user.username,
        image_profile_another: user.image_profile,
        status: false
    }

    await Notification.create(data)

}

// Hàm này dùng để xóa thông báo khi mình unfollow người đó thì sẽ xóa thông báo đó đi
module.exports.unfollowing = async (req, res) => {

    // Get id_user, id_user_another
    const id_user = req.query.id_user

    const id_user_another = req.query.id_user_another

    const notification = await Notification.findOne({ id_user: id_user_another, id_user_another: id_user })

    notification.delete()

    res.send('Thanh Cong')

}

// Hàm này dùng để update status của notification khi người dùng bấm vào notification
module.exports.update = async (req, res) => {

    // Get id_user
    const id_user = req.query.id_user

    const notification = await Notification.find({ id_user: id_user })

    // Chuyển trạng thái thành true hết
    for (let i = 0; i < notification.length; i++){
        if (notification[i].status === false){
            notification[i].status = true

            notification[i].save()
        }
    }

}