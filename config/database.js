require('dotenv').config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.db_host,
  port: process.env.db_port,
  user: process.env.db_user,
  password: process.env.db_pw,
  database: process.env.db,
  connectionLimit: 25,
  waitForConnections: true,
  queueLimit: 0,
  keepAliveInitialDelay: 10000,
  enableKeepAlive: true,
});


  function query (sql, params, callback) {
    pool.getConnection((err, conn) => {
      if (err){
        console.log('db 에러', err);
        return callback(err);
      } 
      console.log('db 연결');
      conn.query(sql, params, (err, results) => {
        conn.release();
        callback(err, results);
      });
    });
  }

  module.exports = { query}