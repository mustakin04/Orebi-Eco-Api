const mongoose=require("mongoose")
const {Schema}=mongoose

const userSchema=new Schema({
    firstName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    isverify:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String,
    },
    otpExpiry:{
        type:Date
    }

})

module.exports=mongoose.model("User",userSchema)