const express = require('express')
const { handleUploadImage , handleUploadVideo, handleUploadPdf} = require('../Controller/imageUpload')
const multerUploads = require('../Utils/MulterUpload')
const route = express.Router()


route.post('/uploadimage', multerUploads.single("image"), handleUploadImage)
route.post('/uploadvideo', multerUploads.single("video"), handleUploadVideo)
route.post('/uploadPdf', multerUploads.single("pdf"), handleUploadPdf)


module.exports = route