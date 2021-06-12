const Category = require("../models/category")

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec( (error, category) => {
        if(error){
            return res.status(400).json({
                error :  "No category found in DB"
            })
        }
        req.category = category;
        next();
    })
}


exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    
    category.save( (error, category) => {
        if(error){
            return res.status(400).json({
                error :  "Not able to save in DB"
            })
        }
        return res.json(category)   // TODO: {category}
    });
}


exports.getCategory = (req, res) => {
    return res.json(req.category)
}


exports.getAllCategories = (req, res) => {
    Category.find().exec( (error, categories) => {
        if(error){
            return res.status(400).json({
                error :  "No categories found in DB"
            })
        }
        res.json(categories)
    })
}


exports.updateCategory = (req, res) => {   // TODO:
    // const category = req.category;
    // category.name = req.body.name;
    // category.save( (err, updatedCategory) => {
    //     if(err){
    //         return res.status(400).json({
    //             err: "Failed to update category"
    //         })
    //     }
    //     res.json(updatedCategory)
    // } )
    Category.findOneAndUpdate(
        {_id : req.category._id},
        {$set : req.body},
        {new : true},
        (error, updatedCategory) => {
            if(error){
                return res.status(400).json({
                    error :  "No able to update category"
                })
            }
            return res.json(updatedCategory)
        }
    )
}

exports.deleteCategory = (req, res) => {
    Category.findOneAndRemove({_id: req.category._id},{useFindAndModify : false})
    .exec( (error, deletedCategory) => {
        if(error){
            return res.status(400).json({
                error :  "Not able to delete category"
            })
        }
        res.json({
            message: "Successfully deleted Category",
            deletedCategory
        })
    })
    
}