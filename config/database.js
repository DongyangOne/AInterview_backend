require('dotenv').config();
const mysql = require("mysql2");

const dbInfo = {
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbInfo);

connection.connect((err) => {
    if (err){
        console.error('mysql error: ', err);
        return;
    }
    console.log("mysql 연결");
});

module.exports = connection;