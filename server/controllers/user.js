const User = require("../models/user")
const {Order, ProductCart} = require("../models/order")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec( (error, user) => {
        if(error || !user){
            return res.status(400).json({
                error : "No user was foundin db"
            })
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findOneAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (error, user) => {
            if(error){
                return res.status(400).json({
                    error : "You are not authorized ro update in db"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    )
}

exports.userPurchaseList = (req, res) => {
    return res.json(req.profile.purchases);
    // Order.findOne({user:req.profile._id})   // TODO:
    // .populate("user", "_id name")
    // .exec( (error, order) => {
    //     if(error){
    //         return res.status(400).json({
    //             error : "No order found in this acount"
    //         })
    //     }
    //     res.json(order)
    // })
}

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];   // creating temp array push all the products into the array
    req.body.order.products.forEach( product => {
        purchases.push({
            _id : product._id,
            name : product.name,
            description : product.description, // TODO:
            category : product.category,
            quantity : product.quantity,
            size: product.size,
            price : product.price,  // TODO: want to look at this at ending
            transaction_id : req.body.order.transaction_id,
            date : new Date()   // TODO:
        })
    })

    User.findOneAndUpdate(
        {_id:req.profile._id},
        {$push : {purchases : purchases}},
        {new : true, useFindAndModify : false},
        (error, purchases) => {
            if(error){
                return res.status(400).json({
                    error : "Unable to save orders in user purchases list"
                })
            }
            next();
        }
    )
}