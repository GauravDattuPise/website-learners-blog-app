
const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken");
const { hashingPassword, matchingPassword } = require( "../helper/helper");

// USER REGISTRATION
exports.registerController = async (req,res) => {

    try {

        const data = req.body;
        const {userName, email, password} = data;

        // user validation
        if(!userName || !email || !password){
            return res.status(400).send({status : false, message : "User all data required (userName,email,password)"})
        }

        // checking user exist or not
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({status : false, message : "Email is alredy registerd"});
        }

        // hashing password
        data.password = await hashingPassword(password);

        // creating document & saving it
        const user = new userModel(data);
        await user.save();

        return res.status(201).send({status : true, message : "Registration is Successful", data : user})

    } catch (error) {
        return res.status(500).send({status : false, message : error.message});
    }
}

// USER LOGIN

exports.loginController = async (req,res) => {

    try {
        
        const data = req.body;
        const {email, password} = data;

        // user validation
        if( !email || !password){
            return res.status(400).send({status : false, message : "email and password is required"})
        }

        // checking user exist or not
        const existingUser = await userModel.findOne({email});
        if(!existingUser){
            return res.status(200).send({status : false, message : "Email is not registerd"});
        }

        // checking password is matching or not
        const matchedPassword = await matchingPassword(password, existingUser.password);
        if(!matchedPassword){
            return res.status(200).send({status : false, message : "Email or Password is incorrect"})
        }

        // creting token
        const token = jwt.sign({userId : existingUser._id}, process.env.SECRET_KEY, {expiresIn : "7d"});

        return res.status(200).send({status : true, message : "Login Successful", user : existingUser, token : token})

    } catch (error) {
        return res.status(500).send({status : false, message : error.message});  
    }
}