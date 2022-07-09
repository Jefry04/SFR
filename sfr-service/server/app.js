require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("../routes/user");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);

module.exports = app;
