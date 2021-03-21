var express = require('express')

var router = express.Router()

const Users_Activity = require('../Controller/users_activity.controller')

router.get('/:id', Users_Activity.index)

router.post('/following', Users_Activity.following)

router.delete('/unfollowing', Users_Activity.unfollowing)

router.get('/', Users_Activity.detail)

router.delete('/delete/post', Users_Activity.delete_post)

module.exports = router