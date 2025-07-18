const db = require('../config/database');

const todayQuestion=(userId,callback)=>{


    const sql=
    'SELECT * FROM question WHERE DATE(time) = CURRENT_DATE() AND user_id = ?;';

     db.query(sql,[userId],(err,result)=>{
          if(err){
            console.log('오류 : ', err);
            return callback({code : 'feedback_error', message : '피드백오류', error : err});
        }

        console.log(result)

        return callback(null,result);


    })
}

module.exports = { todayQuestion };