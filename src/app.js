const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const PORT_NUMBER = 7777;

app.use(express.json());

//add user
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added successfully!");
  } catch (err) {
    res.status(400).send("error in adding user : " + err);
  }
});

//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length > 0) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send("Something went wrong : " + err);
  }
});

//get all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).send("Users not found");
    }
  } catch (error) {
    res.status(400).send("Something went wrong : " + err);
  }
});

//delete a user from database
app.delete("/user", async (req, res) => {
  const userId = req.body?.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong : " + err);
  }
});

//update a user in a database
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndUpdate(userId, req.body);
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong : " + err);
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
