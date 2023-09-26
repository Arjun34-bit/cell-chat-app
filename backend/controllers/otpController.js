const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const express = require("express");
const bodyParser = require("body-parser");
// const twilio = require("twilio");
const nodemailer = require("nodemailer");
const generateToken = require("../config/generateToken");

let otp = "";
let user = {};

const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    console.log("Invalid request passed");
    res.status(400);
  }

  user = await User.findOne({ email });

  if (user) {
    res.status(201);
  } else {
    res.status(400);
    throw Error("Email not Registered");
  }

  //otp generation

  otp = "";

  var digits = "0123456789";
  for (let i = 0; i < 4; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  let otpval = "";
  otpval = otp.toString();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "cellchat86@gmail.com",
      pass: "lqlwezwpifupnvma",
    },
  });

  const mailOptions = {
    from: "cellchat86@gmail.com",
    to: email,
    subject: "OTP For Login",
    html: `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>OTP Email</title>
    <style>
        /* Basic Styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
        }

        /* Header Styles */
        .header {
            background-color: #4CAF50; /* Green */
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        /* Content Styles */
        .content {
            padding: 20px;
        }

        /* OTP Styles */
        .otp {
            font-size: 24px;
            text-align: center;
            margin-bottom: 20px;
            color: #4CAF50; /* Green */
        }

        /* Footer Styles */
        .footer {
            text-align: center;
            padding-top: 20px;
            color: #555555;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Your OTP Verification</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your OTP code for Login is:</p>
            <p class="otp">${otpval}</p>
            <p>Please use this OTP to complete your login process.</p>
            <p>If you didn't request this OTP, please disregard this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2023 Cell-Chat</p>
        </div>
    </div>
</body>
</html>
`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).send("Error in sending OTP");
    } else {
      res.status(200).send("Email Sent");
      console.log("Email Sent " + info.response);
    }
  });
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { otpval } = req.body;

  if (!otpval) {
    console.log("Invalid request passed");
    res.status(400);
  }

  if (otpval === otp) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      pic: user.pic,
      token: generateToken(user._id),
    });
    otp = "";
  } else {
    res.status(400);
    throw Error("Invalid OTP");
  }
});

// const sendOtp = asyncHandler(async (req, res) => {
//   const { phone } = req.body;
//   const accountSid = "ACe12e9b6b5a433ebd99f1df665db0e155";
//   const authToken = "c9b52d3c0056b7c46e687ed1bb164e78";
//   const client = twilio(accountSid, authToken);

//   if (!phone) {
//     console.log("Invalid request passed");
//     res.status(400);
//   }

//   const user = await User.findOne({ phone });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       password: user.password,
//       pic: user.pic,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw Error("Phone number not Registered");
//   }

//   //otp generation

//   var digits = "0123456789";
//   for (let i = 0; i < 4; i++) {
//     otp += digits[Math.floor(Math.random() * 10)];
//   }

//   let otpval = otp.toString();

//   client.messages
//     .create({
//       body: `Your OTP for Cell-Chat is ${otpval}`,
//       from: "+15419523494",
//       to: `+91${phone}`,
//     })
//     .then(() => {
//       res.status(200).send("OTP sent successfully");
//     })
//     .done();
//   .catch((err) => {
//     console.error(err);
//     res.status(500).send("Error in sending otp");
//   });
// });

module.exports = { sendOtp, verifyOtp };
