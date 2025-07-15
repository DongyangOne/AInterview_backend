require('dotenv').config();
const mysql = require("mysql2");

const dbInfo = {
   host: '183.101.17.181', 
   port: 3306, 
   user: 'msh', 
   password: 'one2025', 
   database: 'one2025',
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
