const express = require("express");
const router = express.Router();
const {getProductBYId, createProduct, getProduct, getProductImage, getAllProducts, updateProduct, deleteProduct} = require("../controllers/product");
const {getUserById} = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")


router.param("productId", getProductBYId);
router.param("userId", getUserById);
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getProductImage);
router.get("/products", getAllProducts);
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

module.exports = router;