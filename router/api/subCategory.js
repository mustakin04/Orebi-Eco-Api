const express= require("express")
const {subCategoryController,deleteSubCategory} = require("../../controllers/subCategoryController")
const route= express.Router()

route.post("/createSubCategory",subCategoryController)
route.delete("/deleteSubCategory/:id",deleteSubCategory)

module.exports=route