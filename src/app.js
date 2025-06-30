const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const PORT_NUMBER = 7777;

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added successfully!");
  } catch (err) {
    res.status(400).send("error in adding user : " + err);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT_NUMBER, () => {
      console.log(`listning to port ${PORT_NUMBER}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed");
  });
