require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');
const fieldRouter = require('./routes/field');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', userRouter);
app.use('/fields', fieldRouter);



module.exports = app;
