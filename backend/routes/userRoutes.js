const express = require("express");
const {
  userRegister,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

router.route("/").post(userRegister).get(protect, allUsers);
router.post("/login", authUser);
module.exports = router;
