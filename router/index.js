const express=require("express")
const route=express.Router()
const apiRoute=require("./api/index")
route.use("/api/v2",apiRoute)

module.exports=route