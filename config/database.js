require('dotenv').config();
const mysql = require("mysql2");

const dbInfo = {
   host: process.env.db_host,      
   port: process.env.db_port,
   user: process.env.db_user,
   password: process.env.db_pw,    
   database: process.env.db,
};

let connection;

function handleDisconnect() {
    connection = mysql.createConnection(dbInfo);

    connection.connect(err => {
        if (err) {
            console.error('MySQL 연결 실패:', err);
            setTimeout(handleDisconnect, 2000); 
        } else {
            console.log('MySQL 재연결 성공');
        }
    });

    connection.on('error', err => {
        console.error('MySQL 에러 발생:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
            console.log('연결 끊김 - 재연결 시도 중...');
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = connection;
