const Blog = require('../model/Blog')


async function getAllBlog(req, res) {
    try {
        const response = await Blog.find()
        res.json({response, total:response.length}).status(200)
    } catch (error) {
        console.log(error);
        res.json(response).status(505)
    }
}

async function postBlog(req, res) {
    try {
       
        const response = await Blog.create({title, description, author})
        console.log(response)
        res.json({message: 'Blog created success', response}).status(201)
    } catch (error) {
        console.log(error);
        res.json({message: 'There is an error', error}).status(505)
    }
}
module.exports = {getAllBlog, postBlog}