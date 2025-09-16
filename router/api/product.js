const express=require("express")
const productController = require("../../controllers/productController")
const upload = require("../../middlewere/upload")
const route=express.Router()

route.post("/crateProduct",upload.single("image"),productController)

module.exports=route