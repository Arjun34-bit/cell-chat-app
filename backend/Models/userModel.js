const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  //middleware function executedd before the collection could save in the database.
  if (!this.isModified) {
    next(); //if password is notmodifies it calls the next().
  }
  const salt = await bcrypt.genSalt(10); // no. of iterations.
  this.password = await bcrypt.hash(this.password, salt); //hashes the original password with the generated salt ans assigns it back to the original password before the documnet could saved.
});

const user = mongoose.model("User", userSchema);
module.exports = user;
