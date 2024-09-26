const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const ProductSchema = new Schema ({

product_name: {
    type: String,
    required: true
},
product_quantity: {
    type: Number,
    required: true
},
created_date: {
    type: Date,
    default: Date.now
},
price: {
    type: Number,
    required: true
}


})

const Product = mongoose.model('productData', ProductSchema)
module.exports = Product