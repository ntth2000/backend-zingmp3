const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRoutes = require("./routes/User");
const singerRoutes = require("./routes/Singer");
const homeRoutes = require("./routes/Home");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/zing-mp3";
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection succeeds"))
  .catch((error) => {
    console.log("DB connection has errors");
    console.log(error);
  });
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers: Content-Type, Authorization");
  next();
});
app.use("/user", userRoutes);
app.use("/", singerRoutes);
app.use("/home", homeRoutes);
const port = process.env.PORT || 8800;
app.listen(port, () => console.log(`Listening on port ${port}...`));
