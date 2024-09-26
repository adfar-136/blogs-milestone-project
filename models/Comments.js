const mongoose= require("mongoose")

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message:{
        type:String,
        required:true
    },
    like:{
        type:Number,
    },
    isNested:{
        type:Boolean,
        default:false
    },
    parentComponent:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{timestamps:true})

module.exports= mongoose.model('Comment',commentSchema)