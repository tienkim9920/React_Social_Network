const Following = require('../../Models/following.model')
const Follower = require('../../Models/follower.model')
const Users_Activity = require('../../Models/users_activity.model')
const Chat = require('../../Models/chat.model')
const Users = require('../../Models/users.model')

module.exports.index = async (req, res) => {

    // get id_user, id_user_following
    const id_user = req.query.id_user

    const id_user_following = req.query.id_user_following

    const user_following = await Following.findOne({ id_user: id_user, id_user_following: id_user_following})

    if (user_following){
        res.json("true")
    }else{
        res.json("false")
    }

}

module.exports.detail = async (req, res) => {

    const id_user = req.params.id

    const user_following = await Following.find({ id_user: id_user })

    res.json(user_following)

}

// Hàm này dùng để thêm mới database khi user bấm follow
module.exports.followed = async (req, res) => {

    // get id_user, id_user_following
    const id_user = req.query.id_user

    const id_user_following = req.query.id_user_following

    // Phần này là xử lý thêm mới database following
    const data = {
        id_user,
        id_user_following
    }

    await Following.create(data)

    // Phần này là xử lý thêm mới database follower
    const data_follower = {
        id_user: id_user_following,
        id_user_follower: id_user
    }
    
    await Follower.create(data_follower)

    // Phần này là xử lý update tăng số lượng người followers lên 1 đơn vị
    // Cho chính mình và người đó
    const user_your = await Users_Activity.findOne({ id_user: id_user }) // user_your là của mình =))
    user_your.following = parseInt(user_your.following) + 1
    user_your.save()

    const user_another = await Users_Activity.findOne({ id_user: id_user_following }) // user_another là mình đang ở page của ngta =))
    user_another.followers = parseInt(user_another.followers) + 1
    user_another.save()


    // Tiếp theo là tạo database chat khi bấm following
    const data_chat = {
        id_user1: id_user,
        id_user2: id_user_following,
        content: [],
        count_message: 0
    }

    await Chat.create(data_chat)

    res.send('Thanh Cong')

}

// Hàm này dùng để delete database khi user unfollow
module.exports.unfollow = async (req, res) => {

    // get id_user, id_user_following
    const id_user = req.query.id_user

    const id_user_following = req.query.id_user_following

    await Following.deleteOne({ id_user: id_user, id_user_following: id_user_following })

    await Follower.deleteOne({ id_user: id_user_following, id_user_follower: id_user })

    // Tiếp theo là xóa database chat khi bấm unfollow
    await Chat.deleteOne({ id_user1: id_user, id_user2: id_user_following })

    // Phần này là xử lý update giảm số lượng người followers xuống 1 đơn vị
    // Cho chính mình và người đó
    const user_your = await Users_Activity.findOne({ id_user: id_user }) // user_your là của mình =))
    user_your.following = parseInt(user_your.following) - 1
    user_your.save()

    const user_another = await Users_Activity.findOne({ id_user: id_user_following }) // user_another là mình đang ở page của ngta =))
    user_another.followers = parseInt(user_another.followers) - 1
    user_another.save()

    res.send('Thanh Cong')
}

module.exports.render_following = async (req, res) => {

    const id_user = req.query.id_user

    const following = await Following.find({ id_user: id_user })

    let users_following = []

    // Duyệt vòng for
    for (let i = 0; i < following.length; i++){

        // Tìm kiếm ở database Users có _id bằng với id_user_following mà user đã following
        const user = await Users.findOne({ _id: following[i].id_user_following })

        users_following.push(user)

    }

    res.json(users_following)

}

module.exports.render_follower = async (req, res) => {

    const id_user = req.query.id_user

    const follower = await Follower.find({ id_user: id_user })

    let users_follower = []

    // Duyệt vòng for
    for (let i = 0; i < follower.length; i++){

        // Tìm kiếm ở database Users có _id bằng với id_user_following mà user đã following
        const user = await Users.findOne({ _id: follower[i].id_user_follower })

        users_follower.push(user)

    }

    res.json(users_follower)

}