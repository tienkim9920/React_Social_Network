var express = require('express')

var router = express.Router()

const Chat = require('../Controller/chat.controller')

router.get('/', Chat.index)

router.get('/message', Chat.message)

router.post('/message/send', Chat.send)

router.get('/:id', Chat.all_conversation)

router.get('/message/checking', Chat.checking)

module.exports = router