const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:3
    },
    description:{
        type:String,
        required:true,
        minlength:3,
    },
    tags:{
        type:[String],
        default:['General'],
        required:true,
    },
    imageURL:{
        type:String,
        default:""
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    username:{
        type:String
    },
    upvote:{
        type:Number,
        default:0
    },
    downvote:{
        type:Number,
        default:0

    },
    votedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
},{timestamps:true})
module.exports = mongoose.model('Blog',blogSchema)