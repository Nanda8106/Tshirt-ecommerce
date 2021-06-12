const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fileSystem = require("fs");
const { sortBy } = require("lodash");

exports.getProductBYId = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec( (error, product) => {
        if(error){
            return res.status(400).json({
                error : "No product found in DB"
            })
        }
        req.product = product;
        next();
    });
};


exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (error, fields, file) => {
        if(error){
            return res.status(400).json({
                error : "problem with the image"
            });
        }

        const {name, description, price, category, stock} = fields;
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                error: "Please include all fields"
            })
        }
        let product = new Product(fields);

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "Photo size is too big, it must be less than 3MB"
                })
            }
            product.photo.data = fileSystem.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        product.save( (error, product) => {
            if(error){
                return res.status(400).json({
                    error: "Unable to save product details in DB"
                })
            }
            res.json(product)
        })
    })
}


exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (error, fields, file) => {
        if(error){
            return res.status(400).json({
                error : "problem with the image"
            });
        }

        
        let product = req.product;
        product = _.extend(product, fields) ; // it will update the existing values

        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "Photo size is too big, it must be less than 3MB"
                })
            }
            product.photo.data = fileSystem.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        product.save( (error, updatedPoduct) => {
            if(error){
                return res.status(400).json({
                    error: "Updation of product is failed"
                })
            }
            return res.json(updatedPoduct)
        })
    })
}


exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    res.json(req.product);
}


exports.getProductImage = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

exports.getAllProducts = (req, res) => {
   
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"   //TODO:
    Product.find()
    .populate("category")
    .select("-photo")
    .sort([[sortBy, "asc"]])
    .exec( (error, products) => {
        if(error){
            return res.status(400).json({
                error: "NO products found"
            })
        }
        return res.json(products)
    })
}


exports.deleteProduct = (req, res) => {
    Product.findOneAndRemove({_id : req.product._id},{useFindAndModify : false})
    .exec( (error, deletedProduct) => {
        if(error){
            return res.status(400).json({
                error :  "failed to delete the product"
            })
        }
        res.json({
            message: "Successfully deleted Product",
            deletedProduct
        })
    })
}


exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map( product => {
        return {
            updateOne:{
                filter :{_id: product._id},
                update : {$inc : {stock: -product.quantity, sold: +product.quantity}}  //TODO:
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (error, products) => {
        if(error){
            return res.status(400).json({
                error : "Update stock failed"
            })
        }
    })
    next();
}

// TODO: uniquecategories