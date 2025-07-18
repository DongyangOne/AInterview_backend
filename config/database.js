require('dotenv').config();
const mysql = require("mysql2");

const dbInfo = {
<<<<<<< HEAD
   host: process.env.db_host, //183.101.17.181으로 작성
   port: process.env.db_port,
   user: process.env.db_user, //이름 이니셜대로 작성
   password: process.env.db_pw, 
   database: process.env.db,
=======
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
>>>>>>> parent of a7fa886 (피드백 고정)
};

const connection = mysql.createConnection(dbInfo);

connection.connect((err) => {
    if (err){
        console.error('mysql error: ', err);
        return;
    }
    console.log("mysql 연결");
})


module.exports = connection;
