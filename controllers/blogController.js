const Blog = require("../models/Blog")
const Comment = require("../models/Comments")
exports.addBlog  = async(req,res)=>{
    const {title,description,imageURL} = req.body;
    try {
        const blog = new Blog({
            title:title,
            description:description,
            imageURL:imageURL,
            user:req.user._id,
            username:req.user.username
        })
        await blog.save()
        res.status(201).json({message:"Blog created successfully",Blog})
    } catch (error) {
        res.status(500).json("Server error")
    }
}
exports.updateBlog=async (req,res)=>{
    const {title,description,imageURL} = req.body;
    const {id} = req.params;
    try {
        const blog= await Blog.findByIdAndUpdate(
            id,{title,description,imageURL},
            {new:true}
        )
        if(!blog) {
            return res.status(404).json({msg:"Blog not found"})
        }
        res.json({msg:"Blog Updated",blog})

    } catch (error) {
        res.status(500).json("Server Error")
    }
}
exports.deleteBlog = async (req,res)=>{
    const {id} = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if(!blog){
            return res.status(404).json({msg:"Blog not found"})

        }
        res.json({msg:"Blog deleted succesfully"})
    } catch (error) {
        res.status(500).json({msg:"server error"})
    }
}
exports.addComment=async(req,res)=>{
    const {message} = req.body;
    const {id} = req.params;

    try {
        const comment = new Comment({
            user:req.user._id,
            message:message,
            blog:id

        })
        await comment.save();
        const blog =await Blog.findById(id);
        blog.comments.push(comment._id);
        await blog.save()
        res.status(201).json({msg:"Comment added",comment})

    } catch (error) { 
        res.status(500).json('Server Error')
    }
}
exports.upvoteBlog=async(req,res)=>{
    const {id}= req.params;
    try {
        const blog = await Blog.findById(id);
        if(blog.votedBy.includes(req.user.id)) return res.status(400).json({msg:'Already Voted'})
        blog.upvote += 1;
        blog.votedBy.push(req.user.id)
        await blog.save()
        res.json({msg:"Upvoted",blog})
    } catch (error) {
        res.status(500).send("Server error")
    }
}
exports.downvoteBlog=async(req,res)=>{
    const {id}= req.params;
    try {
        const blog = await Blog.findById(id);
        if(blog.votedBy.includes(req.user.id)) return res.status(400).json({msg:'Already Voted'})
        blog.downvote += 1;
        blog.votedBy.push(req.user.id)
        await blog.save()
        res.json({msg:"Downvoted",blog})
    } catch (error) {
        res.status(500).send("Server error")
    }
}