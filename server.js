require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(session({
  secret: 'yourSecretKey', //세션 보호용 키
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const noticeRouter = require('./routes/noticeRouter');
const signRouter = require('./routes/signRouter');
const logoutRouter = require('./routes/logoutRouter');
<<<<<<< HEAD
const feedbackRouter = require('./routes/feedbackRouter');
=======
const mainfeedbackRouter = require('./routes/mainfeedbackRouter');
const feedbackRouter=require('./routes/recentfeedbackRouter');
const calendarRouter = require('./routes/twcalendarRouter');
>>>>>>> 150a7dc1e501f9eb3ce0576f7e45b678b718f2af
const db = require('./config/database');

app.use('/notice', noticeRouter);
app.use('/sign', signRouter);
app.use('/logout', logoutRouter);
<<<<<<< HEAD
app.use('/feedback', feedbackRouter);
=======
app.use('/feedback', mainfeedbackRouter);
app.use('/feedback',feedbackRouter);
app.use('/calendar', calendarRouter);
>>>>>>> 150a7dc1e501f9eb3ce0576f7e45b678b718f2af


  




const port =  3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`서버 시작 ${port}`);
});