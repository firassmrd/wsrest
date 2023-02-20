const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    Name: {
      type: "string",
      required: true,
    },
    Email: {
      type: "string",
      required: true,
    },
    phone: "number",
    age: "number",
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
