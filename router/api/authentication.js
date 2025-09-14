const express=require("express")
const registrationController = require("../../controllers/registraitonController")
const {otpController,resendOtp} = require("../../controllers/otpController")
const {loginController,dasboard }= require("../../controllers/loginController")
const verification = require("../../middlewere/verification")
const route=express.Router()

route.post("/registration",registrationController)
route.post("/otpverify",otpController)
route.post("/resendOtp",resendOtp)
route.post("/login",loginController)
route.get('/dasboard',verification, dasboard)

module.exports=route