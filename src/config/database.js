const mongoose = require("mongoose");
const url =
  "mongodb+srv://test:15SUUSD5eAs15DTH@nodecluster.goep0kc.mongodb.net/devCollab";
const connectDB = async () => {
  await mongoose.connect(url);
};
module.exports = connectDB;
