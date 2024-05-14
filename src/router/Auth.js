const express = require('express')
const router = express.Router()
const { handleSignUp, handleLogin, handleCheckAuth } = require("../Controller/Auth");
const { verifyToken } = require('../middleware/verifyToken')



router.post('/signUp', handleSignUp)
router.post('/Login', handleLogin)
router.get('/checkAuth', verifyToken , handleCheckAuth)


module.exports = router