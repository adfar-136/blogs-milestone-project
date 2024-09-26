const express =require("express")
const auth = require("../middleware/auth")
const { addBlog, updateBlog,deleteBlog,addComment,upvoteBlog,downvoteBlog } = require("../controllers/blogController")
const router = express.Router()
router.post("/",auth,addBlog)
router.put("/:id",auth,updateBlog)
router.delete("/:id",auth,deleteBlog);
router.post("/:id/comment",auth,addComment)
router.post("/:id/upvote",auth,upvoteBlog)
router.post("/:id/downvote",auth,downvoteBlog)
module.exports = router