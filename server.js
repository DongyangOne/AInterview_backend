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

const feedbackmemoRouter = require('./routes/feedbackmemoRouter');

const userRouter = require('./routes/userRouter');
const deleteRouter = require('./routes/deleteRouter');

const recentfeedbackRouter=require('./routes/recentfeedbackRouter');
const calendarRouter = require('./routes/twcalendarRouter');
const questionRouter=require('./routes/questionRouter');

const feedbackpinRouter = require('./routes/feedbackpinRouter'); 
const sortfeedbackRouter = require('./routes/sortfeedbackRoute');
const searchfeedbackRouter = require('./routes/searchfeedbackRoute');
const mainfeedbackRouter = require('./routes/mainfeedbackRouter');
const titlefeedbackRouter = require('./routes/titlefeedbackRouter');

const myPageRouter = require('./routes/myPageRouter');

const db = require('./config/database');

app.use('/example', Router);

app.use('/notice', noticeRouter);

app.use('/sign', signRouter);
app.use('/user', userRouter);
app.use('/delete', deleteRouter);
app.use('/logout', logoutRouter);
app.use('/feedback', feedbackmemoRouter);

app.use('/question',questionRouter);
app.use('/feedback', recentfeedbackRouter);
app.use('/calendar', calendarRouter);

app.use('/feedback', sortfeedbackRouter); 
app.use('/feedback', searchfeedbackRouter); 
app.use('/feedback', feedbackpinRouter);
app.use('/feedback', mainfeedbackRouter);
app.use('/feedback', titlefeedbackRouter);

app.use('/myPage', myPageRouter);

const port = process.env.s_port || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`서버 시작 ${port}`);
});