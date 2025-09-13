const nodemailer = require("nodemailer");

// Function to send OTP email
const emailverification = async (email, otp) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // use 'gmail' for Gmail
      auth: {
        user: "mustakinhasanmustakin91@gmail.com",
        pass: "rvhzgwfnujskcbmg", // App password (no spaces)
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: '"Mutakin$Tamim" <mustakinhasanmustakin91@gmail.com>',
      to: email,
      subject: "OTP Verification ✔",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP Verification</title>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin:0; padding:0; }
            .container { max-width:600px; margin:50px auto; background-color:#fff; border-radius:8px; padding:30px; box-shadow:0 0 10px rgba(0,0,0,.1); }
            h2 { color:#333; }
            p { color:#555; line-height:1.5; }
            .otp { display:inline-block; font-size:24px; font-weight:700; color:#fff; background-color:#007bff; padding:10px 20px; border-radius:6px; margin:20px 0; letter-spacing:3px; }
            .footer { font-size:12px; color:#999; margin-top:20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>OTP Verification</h2>
            <p>Hello,</p>
            <p>Use the following OTP to complete your action. This OTP is valid for 5 minutes only.</p>
            <div class="otp">${otp}</div>
            <p>If you did not request this, please ignore this email.</p>
            <div class="footer">© 2025 My App. All rights reserved.</div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("✅ Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return false;
  }
};

module.exports = emailverification;
