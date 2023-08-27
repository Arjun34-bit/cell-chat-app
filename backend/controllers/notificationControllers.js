const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const express = require("express");
const bodyParser = require("body-parser");
// const twilio = require("twilio");
const nodemailer = require("nodemailer");
const generateToken = require("../config/generateToken");

const sendMail = asyncHandler(async (req, res) => {
  const { email, senderNames } = req.body;

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
    subject: "You May Have new Messages",
    html: `<h1>Hello! from Cell-Chat</h1> <h4>Your have New Messages from <b>${senderNames}</b></h4>`,
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

module.exports = { sendMail };
