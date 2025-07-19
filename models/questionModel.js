const db = require('../config/database');

const todayQuestion=(callback)=>{


    const sql=
    'SELECT * FROM questions ORDER BY RAND()LIMIT 1;';

     db.query(sql,(err,result)=>{
          if(err){
            console.log('오류 : ', err);
            return callback({code : 'feedback_error', message : '피드백오류', error : err});
        }

        console.log(result)

        return callback(null,result);


    })
}

module.exports = { todayQuestion };