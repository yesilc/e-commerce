const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    rating: Number,
    specification: Array,
    detail: String,
    image: String,
    type: {type: String, required: true},
    user: String
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;