const express=require("express")
const route=express.Router()
const apiRoute=require("./api/index")

route.use(process.env.DB_URL,apiRoute)

module.exports=route