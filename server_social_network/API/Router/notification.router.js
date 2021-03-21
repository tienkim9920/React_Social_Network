var express = require('express')

var router = express.Router()

const Notification = require('../Controller/notification.controller')

router.get('/:id', Notification.index)

router.put('/', Notification.update)

router.post('/', Notification.following)

router.delete('/', Notification.unfollowing)

module.exports = router