
const User = require("../model/userSchema");
const emailValidation = require("../utils/email.validation");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");
const emailverification = require("../utils/email.verification");
const registrationController = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;
    if (!firstName) {
      return res.status(400).json({ message: "Name is not required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is not required" });
    }
    if (!emailValidation(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    if (!password) {
      return res.status(400).json({ message: "Email is not required" });
    }
     const existion= await User.find({email:email})
    //  console.log(existion)
     if(existion.length>0){
      return res.status(400).json({message: "this email all ready use"})
     }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // console.log(hashedPassword);
    const otp = crypto.randomBytes(2).toString("hex");
    // console.log(randomString);
    
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const user = new User({
      firstName,
      email,
      password:hashedPassword,
      otp,
      otpExpiry:expiresAt
    });
    await user.save();
    emailverification(email,otp)
    res.status(200).json({
      message: "succesfully",
      data: user,
    });
  } catch (error) {
    console.log("registration error", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = registrationController;
