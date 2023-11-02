const { Schema,model,Types } = require('mongoose');

//Optimize way 
const schemaProduct = new Schema({
    title : {
        type: String,
        required: true,
        min: 5
    },
    description: String,
    content: String,
    brand : String,
    countStock : {
        type: Number,
        default : 0
    },
    price: Number,
    thumbnail: String,
    image : [String],
    rating : {
        type: Number,
        enum:[0,1,2,3,4,5],
        default: 0
    },
    isFeatured : {
        type: Boolean,
        default: false
    },
    created_at : {
        type: Date,
        default: Date.now
    },
    updated_at : {
        type: Date,
        default: Date.now
    },
    category:{
        type: Schema.Types.ObjectId,ref:'Category'
    }
})
module.exports = model('Product', schemaProduct)

