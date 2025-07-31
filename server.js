require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(session({
  secret: 'yourSecretKey', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const Router = require('./routes/basicRouter');
const noticeRouter = require('./routes/noticeRouter');
const signRouter = require('./routes/signRouter');
const logoutRouter = require('./routes/logoutRouter');
const userRouter = require('./routes/userRouter');
const deleteRouter = require('./routes/deleteRouter');
const monthRouter = require('./routes/monthRouter');
const dayRouter  = require('./routes/dayRouter');
const dateaddRouter = require('./routes/dateaddRouter');
const dateupdateRouter = require('./routes/dateupdateRouter');
const datedeleteRouter = require('./routes/datedeleteRouter');
const calendarRouter = require('./routes/twcalendarRouter');
const questionRouter = require('./routes/questionRouter');
const myPageRouter = require('./routes/myPageRouter');

const feedbackRouter = require('./routes/feedbackRouter');
app.use('/feedback', feedbackRouter);

app.use('/example', Router);
app.use('/notice', noticeRouter);
app.use('/sign', signRouter);
app.use('/user', userRouter);
app.use('/delete', deleteRouter);
app.use('/logout', logoutRouter);

app.use('/calendar', monthRouter);
app.use('/calendar', dayRouter);
app.use('/calendar', dateaddRouter);
app.use('/calendar', dateupdateRouter);
app.use('/calendar', datedeleteRouter);
app.use('/calendar', calendarRouter);

app.use('/question', questionRouter);

app.use('/myPage', myPageRouter);

const port = process.env.s_port || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`서버 시작 ${port}`);
});

const db = require('./config/database');

process.on('SIGINT', () => {
  db.end(() => {
    console.log('MySQL 연결 종료 (서버 종료)');
    process.exit();
  });
});