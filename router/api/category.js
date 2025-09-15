const express=require("express")
const {categoryController,getCategory,deleteCategory,updateCategory} = require("../../controllers/categoryController")
const route=express.Router()

route.post("/createCategory",categoryController)
route.get("/getCategory",getCategory)
route.delete("/deleteCategory/:id",deleteCategory)
route.patch("/updateCategory/:id",updateCategory)
module.exports=route