const mongoose =require("mongoose")
const {Schema}=mongoose

const productSchema=new Schema({
    name:{
        type:String,
        requied:true,
    },
    description:{
        type:String,
        requied:true
    },
    color:{
        type:String,
    },
    price:{
        type:Number,
        requied:true
    },
     color:{
        type:String
    },
    size:{
     type:String
    },
    ram:{
        type:String
    },
    discount:{
        type:String
    },
    Storage:{
        type:String
    },
    image:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubCategory"
    }

})

module.exports=mongoose.model("Product",productSchema)