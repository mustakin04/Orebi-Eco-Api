const express=require("express")
const route=express.Router()
const authRoute=require("./authentication")
const categoryRoute=require("./category")
const subCategoryRoute=require("./subCategory")
route.use("/authentication",authRoute)
route.use("/category",categoryRoute)
route.use("/subCategory",subCategoryRoute)
module.exports=route