const e = require("express");
const User = require("../model/userSchema");
const emailValidation = require("../utils/email.validation");
const crypto = require("crypto"); 
const emailverification = require("../utils/email.verification");

const otpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is not required" });
    }
    if (!emailValidation(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    if (!otp) {
      return res.status(400).json({ message: "otp is not requierd" });
    }
    const user = await User.findOne({ email: email });
    console.log(user.otp);
    if (otp !== user.otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "otp is not valid" });
    }
    if (user.isverify) {
      return res.status(201).json({ message: "otp is alrady verify" });
    }
    const updatedata = await User.findOneAndUpdate(
      { email: email },
      {
        $set: { isverify: true },
        $unset: { otpExpiry: "", otp: "" },
      },
      { new: true }
    );
    res.status(200).json({ message: "sucess", data: updatedata });
  } catch (error) {
    console.log("otpController error:", error.message);
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is not required" });
    }
    if (!emailValidation(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    const existingEmail = await User.findOne({ email: email });
    if(!existingEmail){
        return res.json({message:"email not found"})
    }
    let otp 
    let expiresAt
    if (existingEmail) {
       otp = crypto.randomBytes(2).toString("hex");
      // console.log(randomString);
       expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    }
    const updateOtp = await User.findOneAndUpdate(
      { email: email },
      {
        $set: { otp: otp, otpExpiry: expiresAt },
      },
      { new: true }
    );
    await emailverification(email, otp); // make sure your function accepts otp param
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log("resendotp error:", error.message);
    res.status(400).json({message:"resendtop Error"})
  }
};
module.exports = { otpController, resendOtp };
