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

const noticeRouter = require('./routes/allRouter');

const signRouter = require('./routes/allRouter');
const logoutRouter = require('./routes/allRouter');
const userRouter = require('./routes/allRouter');
const deleteRouter = require('./routes/allRouter');

const searchdayRouter  = require('./routes/allRouter');
const searchmonthRouter = require('./routes/allRouter');
const dateaddRouter = require('./routes/allRouter');
const dateupdateRouter = require('./routes/allRouter');
const datedeleteRouter = require('./routes/allRouter');

const recentfeedbackRouter=require('./routes/allRouter');
const calendarRouter = require('./routes/allRouter');
const questionRouter=require('./routes/allRouter');

const feedbackpinRouter = require('./routes/allRouter'); 
const sortfeedbackRouter = require('./routes/allRouter');
const searchfeedbackRouter = require('./routes/allRouter');
const mainfeedbackRouter = require('./routes/allRouter');
const titlefeedbackRouter = require('./routes/allRouter');
const detailfeedbackRouter = require('./routes/allRouter');
const feedbackmemoRouter = require('./routes/allRouter');
const deletefeedbackRouter = require('./routes/allRouter');

const myPageRouter = require('./routes/allRouter');

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