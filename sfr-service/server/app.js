require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const fieldRouter = require('./routes/field');
const bookingRouter = require('./routes/booking');
const userRouter = require ('./routes/user')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/fields', fieldRouter);
app.use('/booking', bookingRouter);
app.use('/user', userRouter);

module.exports = app;
