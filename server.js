const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const feedbackRouter = require('./routes/feedbackRouter');
app.use('/feedback', feedbackRouter);

const basicRouter = require('./routes/basicRouter');
app.use('/', basicRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});