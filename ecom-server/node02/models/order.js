const { Schema, model } = require('mongoose');

const schemaOrder = new Schema({
    shippingAddress : {
        type: String,
        required: true
    },

    invoiceAddress : String,
    city: String,
    country: String,

    phone : {
        type: String,
        required: true
    },
    
    status : {
        type : String,
        enum:['shipped','received','pending','canceled'],
        default: 'pending' 
    },
    total: Number,
    user : {
        type : Schema.Types.ObjectId, ref : 'User',
        required: true
    },
    created_at: {
        type: Date,
        default : Date.now
    },
    updated_at: {
        type: Date,
        default : Date.now
    },
    orderItems: [{
        type: Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }]
})

module.exports = model('Order',schemaOrder)