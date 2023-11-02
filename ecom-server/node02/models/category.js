const { Schema,model } = require('mongoose');

//Optimize way 
const schemaCategory = new Schema({
    label:String,
    icon:String,
    color:String,
    //retrieve the products list that correspend to the current category
    //products:[{type:Schema.Types.ObjectId, ref:'Product'}]
})
module.exports = model('Category', schemaCategory)
