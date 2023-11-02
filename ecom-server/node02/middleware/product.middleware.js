const joi = require('joi');

exports.validateProduct = (req, res ,next) =>{

    const schemaProduct = joi.object({
        title: joi.string().uppercase().trim().min(5).max(40).required(),
        description: joi.string().trim().min(60).max(500).required(),
        content: joi.string().trim().min(4).max(25).required(),
        brand: joi.string().uppercase().trim().min(2).max(15).required(),
        countStock: joi.number().integer().positive(),
        price: joi.number().positive(),
        //thumbnail: joi.string().trim().min(15).max(200).required,
        //image: joi.array().items(),
        rating: joi.number().valid(0,1,2,3,4,5),
        isFeatured: joi.boolean().default(false),
        created_at: joi.date(),
        updated_at: joi.date(),
        category : joi.string().required(),
        })

        const {error} = schemaProduct.validate(JSON.parse(req.body.product))
        if(error){
            const {path,message} = error.details[0];
            return res.status(404).json({
                error: {
                    path: path[0], message
                }
            })
    
        }
        next();
}