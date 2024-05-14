const express = require('express')
const route = express.Router()
const {  getAllProduct,  getSingleProduct, PostNewProduct, createCart, getAllCart, deleteSingleProduct, UpdateProducts} = require('../Controller/Product')
const multerUploads = require('../Utils/MulterUpload')

route.get('/getAllProducts', getAllProduct)
route.get('/getSingleProduct/:id', getSingleProduct)
route.post('/Postproduct', multerUploads.single('image'), PostNewProduct)
route.post("/create-cart", createCart);
route.get("/get-All-carts", getAllCart);
route.delete('/deleteProduct/:id', deleteSingleProduct)
route.patch('/updateProduct/:id', UpdateProducts)



module.exports = route
