const express = require("express");
const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {getPaymentToken, processPayment} = require("../controllers/PaymentBrainTree")
const router = express.Router();

router.param("userId", getUserById);
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getPaymentToken);
router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, processPayment);

module.exports = router;