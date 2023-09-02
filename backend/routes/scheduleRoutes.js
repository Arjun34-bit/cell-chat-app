const express = require("express");
const { protect } = require("../Middleware/authMiddleware");
const { scheduler } = require("../controllers/scheduleControllers");

const router = express.Router();

router.route("/").post(protect, scheduler);
module.exports = router;
