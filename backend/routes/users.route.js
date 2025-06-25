const express =require('express');
const router =express.Router();
const {body} = require("express-validator")
const userController =require("../controller/user.controller");

router.post('/register',[
  body('email').isEmail().withMessage('Invalid Email'),  
  body('password').isLength({min:5 }).withMessage('psaaword must be at least 5 charecter'),
  body("fullname")



],
userController.registerUser 
)



module.exports =router;