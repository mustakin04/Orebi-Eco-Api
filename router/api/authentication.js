const express=require("express")
const registrationController = require("../../controllers/registraitonController")
const {otpController,resendOtp} = require("../../controllers/otpController")
const route=express.Router()

route.post("/registration",registrationController)
route.post("/otpverify",otpController)
route.post("/resendOtp",resendOtp)

module.exports=route