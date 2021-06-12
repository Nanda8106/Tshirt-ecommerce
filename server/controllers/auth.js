const User = require("../models/user");
const {validationResult, cookie} = require("express-validator")
const jwt= require("jsonwebtoken");
const expressJwt= require("express-jwt");

exports.signup = (req, res) => {
    const errors = validationResult(req);
    const {email,phone_no} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg    
        })
    }
    const user = new User(req.body);
    // checks wether email exist or not
    User.findOne({email}, (error, existEmail) => {
        if(existEmail){
            return res.status(400).json({
                error: "Email already exist"
            })
        }

        User.findOne({phone_no}, (error, existPhone) => {
            if(existPhone){
                return res.status(400).json({
                    error: "Phone already exist"
                })
            }

            user.save( (error, user) => {
                if(error || !user){
                    return res.status(422).json({
                        error: "Unable to save in DB"
                    }) 
                }
                return res.json({
                    name:user.name,
                    email : user.email,
                    id: user.id
                })
            })
        });
    })
}

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const {email, password} = req.body;

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg    
        })
    }

    User.findOne({email}, (error, user) => {
        if(error || !user){
            return res.status(400).json({
                error: "user email doesn't exist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        const token = jwt.sign({_id:user._id}, process.env.SECRET);

        res.cookie("token", token, {expire: new Date()+9999});

        const {_id, name, email,phone_no, role} = user;
        res.json({token, user:{_id, name, email,phone_no, role}})
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    })
}

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty : "auth"
})

exports.isAuthenticated = (req, res, next) => {
    const checker = req.auth && req.profile && req.profile._id == req.auth._id;
    if(!checker){
        return res.status(403).json({
            error : "ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "You are not ADMIN, ACCESS DENIED"
        })
    }
    next();
}