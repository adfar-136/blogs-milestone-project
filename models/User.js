const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    later:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
    }],
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date
    }
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
module.exports = mongoose.model("User",userSchema);