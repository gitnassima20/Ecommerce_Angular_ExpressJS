const joi = require('joi');

exports.validateUser = (req,res,next) => {

    const schemaUser = joi.object({
        name: joi.string().uppercase().trim().min(5).max(25).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(25).required(),
        address: joi.string().trim().min(15).max(40).required(),
        city : joi.string().min(3).max(20).required(),
        country : joi.string().min(3).max(20).required(),
        phone : joi.string().min(10).required(),
        isAdmin : joi.boolean()
    })

    const {value, error} = schemaUser.validate(req.body);

    if(error){
        const {path,message} = error.details[0];
        return res.status(500).json({
            value,
            error: {
                path: path[0],
                message
            }
        })
    }
    next();


}