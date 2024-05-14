const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true

    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
})


module.exports = mongoose.model('hello', BlogSchema)