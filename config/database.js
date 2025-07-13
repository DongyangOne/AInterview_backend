require('dotenv').config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
  .then(conn => {
    console.log('DB 연결완료');
    conn.release();
  })
  .catch(err => {
    console.error('DB 연결실패:', err);
  });

module.exports = pool;