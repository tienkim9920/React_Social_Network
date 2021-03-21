const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentails: true
  }
});

const cors = require("cors");
const port = 8080

const UsersAPI = require('./API/Router/users.router')
const Users_Home = require('./API/Router/users_home.router')
const Users_Activity = require('./API/Router/users_activity')
const Following = require('./API/Router/following.router')
const Notification = require('./API/Router/notification.router')
const Like = require('./API/Router/like.router')
const Comment = require('./API/Router/comment.router')
const Favorite = require('./API/Router/favorite.router')
const Chat = require('./API/Router/chat.router')

const ChatModel = require('./Models/chat.model')

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Social", {
  useFindAndModify: false,
  useCreateIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());

// Router API
app.use('/users', UsersAPI)
app.use('/users_home', Users_Home)
app.use('/users_activity', Users_Activity)
app.use('/following', Following)
app.use('/notification', Notification)
app.use('/like', Like)
app.use('/comment', Comment)
app.use('/favorite', Favorite)
app.use('/chat', Chat)

io.on("connection", (socket) => {
  console.log(`Có người vừa kết nối, socketID: ${socket.id}`);

  socket.on('following', (data) => {
    
    console.log(`id_user: ${data.id_user} vừa follow user có id ${data.id_user_following}`)

    const data_clone = {
      id_user: data.id_user_following,
      id_user_following: data.id_user
    }

    console.log(data_clone)

    socket.broadcast.emit("show_notification", data_clone)

  })

  socket.on('like', (data) => {

    console.log(`id_user: ${data.id_user} vừa gửi socket tới user có id ${data.id_user_another}`)

    const data_clone = {
      id_user: data.id_user_another,
      id_user_another: data.id_user
    }

    console.log(data_clone)

    socket.broadcast.emit("show_favorite", data_clone)

  })

  // Nhận socket gửi tin nhắn
  socket.on('send_message', (data) => {

    //Sau đó nó sẽ update lại database bên phía người nhận
    //Vì 1 bên gửi 1 bên nhận nên category sẽ đổi thành receive
    const newData = {
      id: Math.random().toString(),
      message: data.message,
      category: "receive",
    };

    const postData = async () => {

      const message = await ChatModel.findOne({ id_user1: data.id_user2, id_user2: data.id_user1})

      message.count_message = message.count_message + 1

      message.status = false

      message.content.push(newData)

      message.save()

    };

    postData();

    //Xử lý xong server gửi ngược lại client thông qua socket với key receive_message
    socket.broadcast.emit("receive_message");

  })

})


http.listen(port, () => {
    console.log('listening on *:8080');
});