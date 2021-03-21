var express = require('express')

var router = express.Router()

const Following = require('../Controller/following.controller')

router.get('/', Following.index)

router.post('/', Following.followed)

router.delete('/', Following.unfollow)

router.get('/:id', Following.detail)

router.get('/get/follow', Following.render_following)

router.get('/get/follower', Following.render_follower)

module.exports = router