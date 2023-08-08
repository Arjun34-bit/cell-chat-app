const express = require("express");
const { sendOtp, verifyOtp } = require("../controllers/otpController");

const router = express.Router();

router.route("/").post(sendOtp);
router.route("/verify").post(verifyOtp);

module.exports = router;
