var express = require('express')

var router = express.Router()

const Users_Home = require('../Controller/users_home.controller')

router.get('/', Users_Home.index)

router.post('/post', Users_Home.post_status)

module.exports = router