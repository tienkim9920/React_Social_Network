var express = require('express')

var router = express.Router()

const Users = require('../Controller/users.controller')

router.get('/', Users.index)

router.get('/:id', Users.detail)

router.post('/signin', Users.signin)

router.post('/signup', Users.signup)

module.exports = router