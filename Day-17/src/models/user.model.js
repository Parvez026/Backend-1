const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "User name required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  bio: {
    type: String,
    default: "",
  },
  profilePic: {
    type: String,
    default:
      "default-avatar-profile-icon-vector-social-media-user-image-182145777.webp",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
