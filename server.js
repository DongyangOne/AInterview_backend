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

const db = require('./config/database');

const signRouter = require('./routes/auth/authRouter');
const logoutRouter = require('./routes/auth/authRouter');

const searchdayRouter  = require('./routes/calendar/calendarRouter');
const searchmonthRouter = require('./routes/calendar/calendarRouter');
const dateaddRouter = require('./routes/calendar/calendarRouter');
const dateupdateRouter = require('./routes/calendar/calendarRouter');
const datedeleteRouter = require('./routes/calendar/calendarRouter');

const recentfeedbackRouter=require('./routes/mainpage/mainpageRouter');
const calendarRouter = require('./routes/mainpage/mainpageRouter');
const questionRouter=require('./routes/mainpage/mainpageRouter');
const noticeRouter = require('./routes/mainpage/mainpageRouter');

const feedbackpinRouter = require('./routes/feedback/feedbackRouter'); 
const sortfeedbackRouter = require('./routes/feedback/feedbackRouter');
const searchfeedbackRouter = require('./routes/feedback/feedbackRouter');
const mainfeedbackRouter = require('./routes/feedback/feedbackRouter');
const titlefeedbackRouter = require('./routes/feedback/feedbackRouter');
const detailfeedbackRouter = require('./routes/feedback/feedbackRouter');
const feedbackmemoRouter = require('./routes/feedback/feedbackRouter');
const deletefeedbackRouter = require('./routes/feedback/feedbackRouter');

const myPageRouter = require('./routes/mypage/mypageRouter');
const userRouter = require('./routes/mypage/mypageRouter');
const deleteRouter = require('./routes/mypage/mypageRouter');

app.use('/notice', noticeRouter);

app.use('/sign', signRouter);
app.use('/user', userRouter);
app.use('/delete', deleteRouter);
app.use('/logout', logoutRouter);

app.use('/calendar', searchdayRouter, searchmonthRouter, dateaddRouter, dateupdateRouter, datedeleteRouter, dateupdateRouter, calendarRouter);

app.use('/question', questionRouter);
app.use('/feedback', recentfeedbackRouter);

app.use('/feedback', sortfeedbackRouter, searchfeedbackRouter, feedbackpinRouter, deletefeedbackRouter, 
  mainfeedbackRouter, titlefeedbackRouter, feedbackmemoRouter, detailfeedbackRouter); 
  
app.use('/myPage', myPageRouter);

const port = process.env.s_port || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`서버 시작 ${port}`);
});