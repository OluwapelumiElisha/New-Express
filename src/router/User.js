const express = require('express');
const { getAllUsers, createNewUser } = require('../Controller/User');
const route = express.Router()

route.get('/getAllUser', getAllUsers);
route.post('/createNewUser', createNewUser)



module.exports = route