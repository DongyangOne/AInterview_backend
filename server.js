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

const authRouter = require('./routes/auth/authRouter');

const calendarRouter  = require('./routes/calendar/calendarRouter');

const mainpageRouter = require('./routes/mainpage/mainpageRouter');

const noticeRouter = require('./routes/mainpage/noticeRouter');

const feedbackRouter = require('./routes/feedback/feedbackRouter'); 

const mypageRouter = require('./routes/mypage/mypageRouter');


app.use('/sign', authRouter);
app.use('/logout', authRouter);

app.use('/calendar', calendarRouter);

app.use('/mainpage', mainpageRouter);
app.use('/notice', noticeRouter);

app.use('/feedback', feedbackRouter); 
  
app.use('/myPage', mypageRouter);
app.use('/user', mypageRouter);
app.use('/delete', mypageRouter);

const port = process.env.s_port || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`서버 시작 ${port}`);
});