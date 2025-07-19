require('dotenv').config();
const mysql = require("mysql2");

const dbInfo = {
   host: process.env.db_host,      
   port: process.env.db_port,
   user: process.env.db_user,
   password: process.env.db_pw,    
   database: process.env.db,
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