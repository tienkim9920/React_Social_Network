const Users_Home = require('../../Models/users_home.model')
const Users = require('../../Models/users.model')
const Users_Activity = require('../../Models/users_activity.model')
const Like = require('../../Models/like.model')
const Favorite = require('../../Models/favorite.model')
const Comment = require('../../Models/comment.model')
const Following = require('../../Models/following.model')
const Chat = require('../../Models/chat.model')

module.exports.index = async (req, res) => {

    // Get id_user
    const id_user = req.query.id_user

    // Get search
    const search = req.query.search

    // Đầu tiên duyệt xem id_user này đã follow những user nào
    const users_following = await Following.find({ id_user: id_user })

    let users_chat = []

    // Duyệt vòng for
    for (let i = 0; i < users_following.length; i++){

        // Tìm kiếm ở database Users có _id bằng với id_user_following mà user đã following
        const user = await Users.findOne({ _id: users_following[i].id_user_following })

        users_chat.push(user)

    }

    // Tiếp theo là xử lý phần tìm kiếm
    if (search !== ''){

        const filter_users_chat = users_chat.filter(value => {
            return value.username.toUpperCase().indexOf(search.toUpperCase()) !== -1 || 
            value.name.toUpperCase().indexOf(search.toUpperCase()) !== -1
        })

        res.json(filter_users_chat)

    }else{
        res.json(users_chat)
    }

}

module.exports.message = async (req, res) => {

    const id_user1 = req.query.id_user1

    const id_user2 = req.query.id_user2

    const messages = await Chat.findOne({ id_user1: id_user1, id_user2: id_user2 })

    // Sau khi bấm dô check tin nhắn thì nó phải update dữ liệu
    messages.count_message = 0

    messages.save()

    res.json(messages)

}

module.exports.send = async (req, res) => {

    //Khi mà user bấm gửi tin nhắn thì nó sẽ lấy query sau đó push vào cơ sở dữ liệu

    const id_user1 = req.query.id_user1
    const id_user2 = req.query.id_user2

    const data = {
        id: Math.random().toString(),
        message: req.query.message,
        category: req.query.category,
    }

    //Tìm đúng tới cuộc trò chuyện của user xong sau đó push vào
    const messages = await Chat.findOne({ id_user1: id_user1, id_user2: id_user2 })

    messages.content.push(data)

    messages.save()

    res.send("Thành Công!")

}

module.exports.all_conversation = async (req, res) => {

    const id_user1 = req.params.id

    const messages = await Chat.find({ id_user1: id_user1 })

    res.json(messages)

}

module.exports.checking = async (req, res) => {

    const id_user1 = req.query.id_user1

    const id_user2 = req.query.id_user2

    const conversation = await Chat.findOne({ id_user1: id_user2, id_user2: id_user1})

    if (conversation){
        res.send("Thanh Cong")
    }else{
        res.send("That Bai")
    }

}