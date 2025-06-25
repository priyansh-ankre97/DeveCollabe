const express = require("express");
const app = express();
const PORT_NUMBER = 7777;
app.use("/test", (req, res) => {
  res.send("hello test!");
});
app.use("/hello", (req, res) => {
  res.send("hello hello!");
});
app.use("/", (req, res) => {
  res.send("hello!");
});

app.listen(PORT_NUMBER, () => {
  console.log(`listning to port ${PORT_NUMBER}`);
});
