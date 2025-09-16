const mongoose=require("mongoose")
const {Schema}=mongoose

const subCategorySchema=new Schema({
      name:{
        type:String,
        requierd:true
      },
      description:{
        type:String,
        required:true
      },
      category:{
        type:mongoose.Schema.Types.ObjectId,
         ref:'Category'
      }
})
module.exports=mongoose.model("Subcategory",subCategorySchema)