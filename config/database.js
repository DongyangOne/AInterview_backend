require('dotenv').config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err){
        console.error('DB 연결에 실패했습니다:', err);
        return;
    }
    console.log('DB에 성공적으로 연결되었습니다.');
});

module.exports = connection;