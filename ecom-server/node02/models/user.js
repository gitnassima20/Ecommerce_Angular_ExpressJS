const { Schema, model} =  require('mongoose');

//Validation database side

const schemaUser = new Schema({
   name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique : true
    },
    password : {
        type: String,
        required: true,
    },
    address : String,
    city : String,
    country : String,
    phone : String,
    isAdmin : {
        type : Boolean,
        default: false,
    } 
})
module.exports = model('User', schemaUser)
