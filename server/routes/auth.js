const express = require("express");
const router = express.Router();
const {check} = require("express-validator")
const {signup, signin, signout} = require("../controllers/auth")

router.post("/signup", [
    check("name", "name should contains atleast three letters").isLength({min:3, max:32}),
    check("email", "email must be in the form of eamil").isEmail(),
    check("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
], signup);

router.post("/signin", [
    check("email", "email must be in the form of eamil").isEmail(),
    check("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
], signin)

router.get("/signout", signout)

module.exports = router;