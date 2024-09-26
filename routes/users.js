const express = require("express")
const router = express.Router()
const {registerUser,loginUser,getUser,logoutUser} = require("../controllers/userController")
const auth = require("../middleware/auth")
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/me",auth,getUser)
router.post("/logout",auth,logoutUser)
module.exports = router