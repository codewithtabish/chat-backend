const express = require("express");
const router=express.Router()
const userController=require('../controller/user-controller')
const userMiddleware=require('../middleware/userValidator')


router.post('/signup',userMiddleware.validateUserFields,userController.signup)

router.post('/signin',userController.signIn)




module.exports=router
