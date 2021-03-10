const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const cors = require("cors");
const port = 3000

const UsersAPI = require('./API/Router/users.router')
const Users_Home = require('./API/Router/users_home.router')

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


http.listen(3000, () => {
    console.log('listening on *:3000');
});