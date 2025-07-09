require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const noticeRouter = require('./routes/noticeRouter');
const signRouter = require('./routes/signRouter');
const logoutRouter = require('./routes/logoutRouter');
const monthRouter = require('./routes/monthRouter');
const db = require('./config/database');

app.use('/example', Router);
app.use('/notice', noticeRouter);
app.use('/sign', signRouter);
app.use('/logout', logoutRouter);
app.use('/calendar', monthRouter);

const port = process.env.s_port || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`서버 시작 ${port}`);
});