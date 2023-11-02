const Category = require('./../models/category');
const mongoose = require('mongoose');

exports.categories = async(req, res, next) => {

    try{
        const categories= await Category.find()
        res.json( { 
           categories,
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
        const myCategory= await Category.findById(id);

        if(!myCategory){
            return res.status(404).json({
                success: false,
                message:'Category not found'
            })
        }

        res.json( { 
            myCategory,
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


exports.store = (req, res) => {
    let {label, icon, color } = req.body;
    const myCategory = new Category({
        label : label,
        icon:icon,
        color: color
    })
    myCategory.save()
            .then(insertedCategory => {
                res.status(201).json({
                    Category : insertedCategory,
                    success:true
                })
            })
            .catch(error => {
                res.status(500).json({
                    error: error,
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
        const categories= await Category.findOneAndReplace({'_id':id},req.body);

        if(!categories){
            return res.status(404).json({
                success: false,
                message:'Category not found'
            })
        }

        res.json( { 
            categories,
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
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid ID !"
        })
    }

    try{
        const categories= await Category.findOneAndUpdate({'_id':id},req.body);

        if(!categories){
            return res.status(404).json({
                success: false,
                message:'Category not found'
            })
        }

        res.json( { 
            categories,
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


exports.store = (req, res) => {
    let {label, icon, color } = req.body;
    const myCategory = new Category({
        label : label,
        icon:icon,
        color: color
    })
    myCategory.save()
            .then(insertedCategory => {
                res.status(201).json({
                    category : insertedCategory,
                    success:true
                })
            })
            .catch(error => {
                res.status(500).json({
                    error: error,
                    success:false
                })
            })
}

exports.remove = async(req, res) => {
    let { id }=req.params
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            success:false,
            message:"Invalid ID !"
        })
    }

    try{
        const categories= await Category.findOneAndDelete({'_id':id});

        if(!categories){
            return res.status(404).json({
                success: false,
                message:'Category not found'
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

//users/products/catregories/orders/order-items