// const { response } = require('express')
const User = require('../model/User')


async function getAllUsers(req,res) {
    try {
        const response = await User.find()
        res.json({response, total: response.length}).status(200)
    } catch (error) {
        res.json(response).status(500)
    }
}

async function createNewUser(req,res) {

const {name, email, password} = req.body
if(!name || !email || !password) return res.status(403).json({message: 'please fill all destails'})

    try {
        const response = await User.create({name, email, password});
        console.log(response);
        res.json({message: 'user created success', response}).status(201)
    } catch (error) {
        console.log(error);
        res.json({message: 'here is an error', error}).status(505)
    }

}


module.exports = {getAllUsers, createNewUser}