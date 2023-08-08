const express = require("express");
const { protect } = require("../Middleware/authMiddleware");
const {
  accessChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
  removeChat,
} = require("../controllers/chatControllers");

const router = express.Router();

router.route("/").post(protect, accessChats);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);
router.route("/removechat/").put(protect, removeChat);

module.exports = router;
