const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/User");
const authRoutes = require("./routes/Auth");
const homeRoutes = require("./routes/Home");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/zing-mp3";
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connection succeeds"))
  .catch((error) => {
    console.log("DB connection has errors");
    console.log(error);
  });

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/", homeRoutes);

const port = process.env.PORT || 8800;
app.listen(port, () => console.log(`Listening on port ${port}...`));
