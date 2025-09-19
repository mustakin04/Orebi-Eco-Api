const express= require("express")
const {subCategoryController,deleteSubCategory,getSubCategory} = require("../../controllers/subCategoryController")
const route= express.Router()

route.post("/createSubCategory",subCategoryController)
route.delete("/deleteSubCategory/:id",deleteSubCategory)
route.get("/getSubCategory",getSubCategory)
module.exports=route