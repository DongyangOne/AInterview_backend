require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const Router = require('./routes/basicRouter');
const db = require('./config/database');

app.use('/example', Router);

const port = process.env.s_port || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`서버 시작 ${port}`);
});