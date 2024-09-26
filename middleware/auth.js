const jwt = require('jsonwebtoken')
const User = require("../models/User")

module.exports = async (req,res,next)=>{
   const token = req.cookies.token;
   if(!token){
    return res.status(401).json({msg:"No token, authorization denied"})
   }
   try {
    const decoded = jwt.verify(token,"secret_adfar");
    req.user = await User.findById(decoded.id);
    next();
   } catch (error) {
    res.status(401).json({msg:"Invalid Token"})
   }
}