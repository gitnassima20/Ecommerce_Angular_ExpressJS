const joi = require('joi');

//Validation backend side

exports.validateCategory = (req,res,next) =>{

    schemaCategorry = joi.object({

        label: joi.string().uppercase().min(3).max(15).required(),
        icon : joi.string().required(),
        color : joi.string().required()
    
    })

    const {value, error} = schemaCategorry.validate(req.body);

    if(error){
        const {path,message} = error.details[0];
        res.status(500).json({
            success:false,
            error : {
                path: path[0],message
            }
        })
    }
    next();

}
          