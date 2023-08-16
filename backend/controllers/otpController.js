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
  otp = "";
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

  var digits = "0123456789";
  for (let i = 0; i < 4; i++) {
    otp = digits[Math.floor(Math.random() * 10)];
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
    html: `<h1>Welcome! to Cell-Chat</h1> <h4>Your four digit One Time Password Number : <b>${otp}</b></h4>`,
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
