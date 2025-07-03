const validator = require("validator");
const signupValidationData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const loginValidationData = (req) => {
  const { emailId } = req.body;
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }
};

const profileEditValidationData = (req) => {
  const ALLOWED_FIELDS = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "skills",
    "photoUrl",
    "about",
  ];
  const data = req.body;
  for (const key in data) {
    if (!ALLOWED_FIELDS.includes(key)) {
      throw new Error("Invalid Edit field");
    }
  }
};

const strongpasswordValidationData = (oldPassword, newPassword) => {
  if (oldPassword === newPassword) {
    throw new Error("New password cannot be same as old password");
  } else if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Password is not strong");
  }
};

module.exports = {
  signupValidationData,
  loginValidationData,
  profileEditValidationData,
  strongpasswordValidationData,
};
