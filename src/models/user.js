const mongoose = require("mongoose");
const validator = require("validator");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "!devCollab@765";
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password: " + value);
        }
      },
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter a valid email: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 10) {
          throw new Error("skills can not be more than 10");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnYfGoMOe2DohLsx9gDowgSwK4MSbogUh8V4dFYAybBoqbwHvoCWTAdcU&s",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter a valid url: " + value);
        }
      },
    },
    about: {
      type: String,
      minLength: 10,
      maxLength: 500,
      // default: "I am a developer",
    },
  },
  { timestamps: true }
);

userSchema.methods.getJwtToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const passwordMatch = await bcrypt.compare(password, user.password);
  return passwordMatch;
};
module.exports = mongoose.model("User", userSchema);
