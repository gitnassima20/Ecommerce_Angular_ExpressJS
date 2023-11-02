const Product = require('./../models/product');
const mongoose = require('mongoose');


exports.products = async(req, res, next) => {

    try{ 
        const products= await Product.find().populate('category','-_id label');
        res.json( { 
            products,
            success: true
         });
    }
    catch(err){
        res.status(500).json({
            err,
            success: false,
        })
    }
};

exports.show = async(req, res, next) => {
    let { id }=req.params
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid ID"
        })
    }

    try{
        const product= await Product.findById(id);

        if(!product){
            return res.status(404).json({
                success: false,
                message:'product not found'
            })
        }

        res.json( { 
            product,
            success: true
         });
        
    }
    catch(err){
        res.status(500).json({
            err,
            success: false,
        })
    }
};


// exports.store = (req, res) => {
//     let { filename } = req.file
//     let thumbnail = ""

//     if(filename){
//         const domain = process.env.DOMAINE_NAME
//         thumbnail = `${domain}/images/${filename}`
//     }
//     // console.log(req.filename)
    
//     let {title, description, brand, countStock, price, rating, isFeatured , category} = req.body;
//     // console.log(req.body)
//     const myProduct = new Product({
//         title,
//         description,    
//         // content,
//         brand,
//         countStock,
//         price,
//         thumbnail,
//         // image,
//         rating,
//         isFeatured,
//         category
//     })
//     myProduct.save()
//             .then(insertedProduct => {
//                 res.status(201).json({
//                     product : insertedProduct,
//                     success:true
//                 })
//             })
//             .catch(error => {
//                 res.status(500).json({
//                     error: error,
//                     success:false
//                 })
//             })

// }

exports.store = (req, res) =>{
    let { title,description,brand,countStock,price,rating,isFeatured,category } = JSON.parse(req.body.product);
    let { filename } = req.file;
    let thumbnail = ""
    if(filename){
        const domaine = process.env.DOMAIN_NAME
        const port = process.env.PORT
        thumbnail = `${domaine}/images/${filename}`
    }
    // let images = req.files.filename;
    const myProduct = new Product({
        title,
        description,
        brand,
        countStock,
        price,
        thumbnail,
        rating,
        isFeatured,
        category
    })
     myProduct.save()
     .then(insertedProduct => {
        res.status(201).json({
            product:insertedProduct,
            success:true
        })
     })
     .catch(err => {
        res.status(500).json({
            error: err,
            success:false
        })
     })
}

exports.updateAll = async(req, res) => {
    let { id }=req.params
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid ID !"
        })
    }

    try{
        const product= await Product.findOneAndReplace({'_id':id},req.body);

        if(!product){
            return res.status(404).json({
                success: false,
                message:'product not found'
            })
        }

        res.json( { 
            product,
            success: true
         });
        
    }
    catch(err){
        res.status(500).json({
            err,
            success: false,
        })
    }
};

exports.updateSome = async(req, res) => {
    let { id }=req.params
    let { filename } = req.file
    let thumbnail = ""

    if(filename){
        const domain = process.env.DOMAINE_NAME
        thumbnail = `${domain}/images/${filename}?${Date.now()}`;
    }
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid ID !"
        })
    }

    try{
        const product= await Product.findOneAndUpdate({'_id':id},thumbnail);

        if(!product){
            return res.status(404).json({
                success: false,
                message:'product not found'
            })
        }

        res.json( { 
            product,
            success: true
         });
        
    }
    catch(err){
        res.status(500).json({
            err,
            success: false,
        })
    }
};


// exports.store = (req, res) => {
//     let {title, content, price, category } = req.body;
//     const myProduct = new Product({
//         title : title,
//         content:content,
//         price: price,
//         category
//     })
//     myProduct.save()
//             .then(insertedProduct => {
//                 res.status(201).json({
//                     product : insertedProduct,
//                     success:true
//                 })
//             })
//             .catch(error => {
//                 res.status(500).json({
//                     error: error,
//                     success:false
//                 })
//             })
// }

exports.remove = async(req, res) => {
    let { id }=req.params
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid ID !"
        })
    }

    try{
        const product= await Product.findOneAndDelete({'_id':id});

        if(!product){
            return res.status(404).json({
                success: false,
                message:'product not found'
            })
        }

        res.json( { 
            success: true
         });
        
    }
    catch(err){
        res.status(500).json({
            err,
            success: false,
        })
    }
};

exports.search = async(req,res) =>{
    // let segment = req.params.segment
    let {search, fields} = req.query


    // let data = {
    //     [segment]: search
    // }
    // return res.json(data)

    if(search){
        try{
            // let result = await Product.find({[segment]: {$regex: search, $options:'i'}})
            let result = await Product.find(
                {$or:[
                    {title: {$regex: search, $options:'i'}},
                    {description: {$regex: search, $options:'i'}},
                    {content: {$regex: search, $options:'i'}},
                    ]
                })
                .select(fields)
                .sort({'created_at':-1}) //desc order
            if(!result.length){
                return res.status(404).json({
                    success: false,
                    message:"Product(s) not found !",
            })
        }
    
        res.json({
            success:true,
            products : result
        })
        }
        catch(err){
            res.status(500).json({
                success: false,
                message:"Sever is down"
            })
        }
    }
    
    
}

exports.uploadImages = async(req,res)=>{
    let id = req.params.id

    const domain = process.env.DOMAINE_NAME
 
    const image = req.files.map(file => `${domain}/images/${file.filename}`)
    
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, {image:image},{new:true})

        if(!updatedProduct){
            return res.status(404).json({
                success:false,
                message:'Product not found'
            })
        }

        res.json({
            success: true,
            product: updatedProduct
        })

    } catch(err){
        res.status(500).json({
            success: false,
            err
        })
    }

    
}
