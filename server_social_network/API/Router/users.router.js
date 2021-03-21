var express = require('express')

var router = express.Router()

const Users = require('../Controller/users.controller')

router.get('/', Users.index)

router.get('/:id', Users.detail)

router.post('/signin', Users.signin)

router.post('/signup', Users.signup)

router.get('/search/keyword', Users.search)

router.put('/update', Users.update)

router.put('/change/password', Users.password)

router.put('/update/avatar', Users.avatar)

module.exports = router