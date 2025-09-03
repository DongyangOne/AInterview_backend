require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

const authRouter = require('./routes/auth/authRouter');
const calendarRouter = require('./routes/calendar/calendarRouter');
const feedbackRouter = require('./routes/feedback/feedbackRouter');
const mainpageRouter = require('./routes/mainpage/mainpageRouter');
const mypageRouter = require('./routes/mypage/mypageRouter');
const noticeRouter = require('./routes/notice/noticeRouter');

app.use('/sign', authRouter);
app.use('/logout', authRouter);

app.use('/calendar', calendarRouter);

app.use('/feedback', feedbackRouter);

app.use('/mainpage', mainpageRouter);

app.use('/myPage', mypageRouter);
app.use('/user', mypageRouter);
app.use('/delete', mypageRouter);

app.use('/notice', noticeRouter);

const port = process.env.s_port || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`\n서버 시작: http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/api-docs`);
});
