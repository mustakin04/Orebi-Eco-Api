const User = require("../model/userSchema");
const emailValidation = require("../utils/email.validation");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is not required" });
    }
    if (!emailValidation(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    if (!password) {
      return res.status(400).json({ message: "Email is not required" });
    }
    const existionUser = await User.findOne({ email: email });
    if (!existionUser) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    if (!existionUser.isverify) {
      return res.status(400).json({ message: "Email is not verify" });
    }
    bcrypt.compare(password, existionUser.password, function (err, result) {
      if (result) {
        const token = crypto.randomBytes(16).toString("hex");

        req.session.user = {
          email,
          token,
        };
        res.status(200).json({ message: "login successfully Done" });
      } else {
        res.status(400).json({ message: "Password not correct" });
      }
      // console.log(req.session,"ik")

    //   console.log(req.session.user);
    });
  } catch (error) {
    console.log("Login error:", error.message);
    res.status(400).json({ message: "login error" });
  }
};

const dasboard = (req, res) => {
  res.json({ message: "ami dashboaldj" });
};
module.exports = { loginController, dasboard };
