const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser =async(req,res)=>{
    const {username,email,password} = req.body;
    try {
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"Email already exists"})
        }
        user = new User({username,email,password})
        await user.save()
        const token = jwt.sign({id:user._id},"secret_adfar",{expiresIn:'1h'})
        res.cookie('token',token,{
            httpOnly:true,
            maxAge: 900000
        })
        console.log(token)
        res.status(201).json({message:"User created successfully"})
    } catch (error) {
        res.status(500).send("server error")
    }
}
exports.loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid email or password"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"})
        }
        const token = jwt.sign({id:user._id},"secret_adfar",{expiresIn:'1h'})
        console.log(token)
        res.cookie('token',token,{
            httpOnly:true,
            maxAge: 900000
        })
        res.status(200).json({message:"User logged in successfully"})
    } catch (error) {
        res.status(500).send("server error")
    }
}
exports.getUser =(req,res)=>{
    res.json({user:req.user})
}
exports.logoutUser = (req,res)=>{
    // res.clearCookie('token')
    res.cookie('token','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({msg:"Logout successfully"})
}