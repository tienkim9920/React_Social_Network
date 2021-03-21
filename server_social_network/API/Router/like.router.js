var express = require('express')

var router = express.Router()

const Like = require('../Controller/like.controller')

router.post('/', Like.like)

router.put('/', Like.Unlike)

router.get('/checking', Like.checking)

router.get('/', Like.Count_Like)

module.exports = router