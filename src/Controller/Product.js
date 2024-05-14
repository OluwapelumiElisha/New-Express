const Product = require('../model/Product')
const cloudinary = require('../Utils/Cloudinary-Setup')
const Cart = require('../model/Cart')
async function getAllProduct(req, res){
    try{
        const response = await Product.find()
        res.json({response, total:response.length}).status(202)

    } catch (error) {
        // res.json(reponse).status(505)
    }
}


// async function PostProduct(req, res){
//     const {title, price, description, category, image, rating} = req.body
//     try{
//         const response = await Product.create({title, price, description, category, image, rating})
//         console.log(response)
//         res.json({message: 'Product created success', response}).status(201)
//     } catch (error){
//         console.log(error);
//         res.json({message: 'here is an error', error}).status(505)
//     }
// }

async function getSingleProduct(req, res) {
    try {
        const id = req.params.id
    const response = await Product.findById(id)
    res.json({response, total:response.length}).status(202)
    } catch (error) {
        console.log(error);
    }
    
}


 async  function PostNewProduct(req, res) {
    const {title, description, price, category}  = req.body
        console.log(req.body);
        try {
            const result = await cloudinary.uploader.upload(req.file.path,{
                folder: 'Website Image',
            })
            console.log(result,'result');
            const respons = await Product.create({
                title, description, price, category, image: result.secure_url, public: result.public_id
            })
            if (!respons) {
                return res.status(400).json({message: 'Error Creating Product'})

            }
            res.json({message: "Product Create Successfully", respons}).status(202)
        } catch (error) {
            console.log(error)
        }
        // try {
          
        // const response = await Product.create(req.body)
        // if (!response) {
        //   return  res.status(404).json.message({message: "Error While Creaing product"})
        // }
        // res.status(201).json({message: "Product Created Successfully", response})
        // } catch (error) {
        //     console.log(error);
        //     res.status(505).json({message: "Is an error", error})
        // }
    }
    const UpdateProducts = async(req,res) =>{
        try {
            const newProduct = req.body
            const { id } = req.params
            console.log(id);
            console.log(newProduct);
            const response = await Product.findByIdAndUpdate(id, newProduct, {new:true})
            res.status(201).json(response)
        } catch (error) {
            res.status(505).json(error)
        }
    }
    async function createCart(req, res) {
        try {
        const response = await Cart.create(req.body)
        if (!response) {
          return  res.status(404).json.message({message: "Error While Creaing produc"})
        }
        res.status(201).json({message: "Product Created Successfully", response})
        } catch (error) {
            console.log(error);
            res.status(505).json({message: "Is an error", error})
        }
        
    }
    async function getAllCart(req, res) {
       try {
        const response = await Cart.find()
        res.json({response, total:response.length}).status(202)
       } catch (error) {
        
       }
    }

    async function deleteSingleProduct(req, res) { 
        try {
            const id = req.params.id
            const response = await Product.findByIdAndDelete(id)
            res.json({message: "Product Deleted Successfully", response}).status(202)
          
        } catch (error) {
            console.log(error);
            res.json({message: "Is an error", error}).status(505)
        }
    }

module.exports = {getAllProduct, getSingleProduct, PostNewProduct, createCart, getAllCart, deleteSingleProduct, UpdateProducts}