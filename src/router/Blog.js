const express = require('express')
const { getAllBlog, postBlog } = require('../Controller/Blog')
const route = express.Router()


route.get('/getAllBlog', getAllBlog)
route.post('/postBlog', postBlog)

module.exports = route