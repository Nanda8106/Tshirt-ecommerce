const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const productCartSchema = new mongoose.Schema({
    product : {
        type : ObjectId,
        ref: "Product",
    },
    name: String,
    quantity : Number,
    size: String,
    price : Number
})
const ProductCart = mongoose.model("ProductCart", productCartSchema);

const orderSchema = new mongoose.Schema({
    products : [productCartSchema],
    address : String,
    transaction_id : {},
    total_amount : Number,
    updated : Date,
    status : {
        type : String,
        default : "Recieved",
        enum : ["Cancelled", "Delivered", "Shipped", "Processing", "Recieved"]
    },
    user : {
        type : ObjectId,
        ref : "User"
    }

}, {timestamps : true})

const Order = mongoose.model("Order", orderSchema);

module.exports = {Order, ProductCart};