const express=require("express")
const registrationController = require("../../controllers/registraitonController")
const otpController = require("../../controllers/otpController")
const route=express.Router()

route.post("/registration",registrationController)
route.post("/otpverify",otpController)

module.exports=route