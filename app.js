const express = require("express");
const mongoose = require("mongoose")
const userRouter = require("./routes/users")
const blogRouter = require("./routes/blogs")
const cookieParser = require("cookie-parser")
const app = express();
app.use(express.json())
app.use(cookieParser())

mongoose.connect("mongodb://localhost:27017/blogapp").then(()=>{
    console.log("Connected to MongoDB");
})
app.use("/api/users",userRouter)
app.use("/api/blogs",blogRouter) 
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})