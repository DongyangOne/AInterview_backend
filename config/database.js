require('dotenv').config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

pool.getConnection()
  .then(conn => {
    console.log('db 연결 성공');
    conn.release();
  })

  .catch(err => {
    console.error('db 생성 실패했습니다:', err);

  })


module.exports = pool;
