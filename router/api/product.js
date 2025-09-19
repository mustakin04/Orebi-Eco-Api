const express=require("express")
const {productController,getProduct} = require("../../controllers/productController")
const upload = require("../../middlewere/upload")

const route=express.Router()

route.post("/crateProduct",upload.single("image"),productController)
route.get("/getProduct",getProduct)

module.exports=route