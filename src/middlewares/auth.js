const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SECRET_KEY = "!devCollab@765";
const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Please login!" });
    }
    const decodedData = jwt.verify(token, SECRET_KEY);
    const { _id } = decodedData;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { authUser };
