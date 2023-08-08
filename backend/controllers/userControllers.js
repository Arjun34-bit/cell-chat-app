const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");

const generateToken = require("../config/generateToken");

const userRegister = asyncHandler(async (req, res) => {
  const { name, email, phone, password, pic } = req.body;

  if (!name || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    pic,
  });

  if (user) {
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
    throw new Error("Registration failed");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;

  const user = await User.findOne({ phone });
  // const user1 = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
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
    throw Error("Invalid Email or Password");
  }
});

//  /api/users?search=arjun     making query to send data
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { phone: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  console.log(keyword);

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { userRegister, authUser, allUsers };
