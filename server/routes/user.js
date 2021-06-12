const expresss = require("express");
const router = expresss.Router();
const {getUserById, getUser, updateUser, userPurchaseList} = require("../controllers/user")
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")

router.param("userId", getUserById);

router.get("/user/:userId",isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

// user order list
router.get("/order/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

module.exports = router;


