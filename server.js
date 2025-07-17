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

const Router = require('./routes/basicRouter');
const noticeRouter = require('./routes/noticeRouter');
const signRouter = require('./routes/signRouter');
const logoutRouter = require('./routes/logoutRouter');
const db = require('./config/database');

app.use('/example', Router);
app.use('/notice', noticeRouter);
app.use('/sign', signRouter);
app.use('/logout', logoutRouter);


const feedbackRouter=require('./routes/feedbackRouter');
app.use('/feedback',feedbackRouter);


app.post('/',(req,res)=>{
  res.send('hello');
  console.log("post response");
})

app.get('/',(req,res)=>{
  res.send('hello');
  console.log("get response");
})




const port =  3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`서버 시작 ${port}`);
});