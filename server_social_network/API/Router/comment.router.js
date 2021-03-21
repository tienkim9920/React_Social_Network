var express = require('express')

var router = express.Router()

const Comment = require('../Controller/comment.controller')

router.get('/:id', Comment.index)

router.post('/', Comment.post_comment)

module.exports = router