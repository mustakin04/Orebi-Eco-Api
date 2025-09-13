const  User = require("../model/userSchema");
const emailValidation = require("../utils/email.validation");

const otpController =async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is not required" });
    }
    if (!emailValidation(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    if(!otp){
        return res.status(400).json({message:"otp is not requierd"})
    }
    const user=await User.findOne({email:email})
    console.log(user.otp)
    if(otp!==user.otp || user.otpExpiry< Date.now()){
        return res.status(400).json({message:"otp is not valid"})
    }
    if(user.isverify){
        return res.status(201).json({message:"otp is alrady verify"})
    }
    const updatedata=await User.findOneAndUpdate({email:email},
        {
            $set:{isverify:true},
            $unset:{otpExpiry:"",otp:""}
        },
        {new:true}
    )
    res.status(200).json({message:"sucess",data:updatedata})
  } catch (error) {
    console.log("otpController error:", error.message);
  }
};
module.exports=otpController