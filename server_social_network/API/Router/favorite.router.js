var express = require('express')

var router = express.Router()

const Favorite = require('../Controller/favorite.controller')

router.get('/:id', Favorite.index)

router.post('/', Favorite.like)

router.delete('/', Favorite.unlike)

router.put('/', Favorite.update)

module.exports = router