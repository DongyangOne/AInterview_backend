const db = require('../config/database');



//일정 조회
const TwTODO=(userId,callback)=>{


    const sql=
    'SELECT calendar_id, title FROM calendar WHERE  DATE(time) BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL WEEKDAY(CURRENT_DATE()) DAY) AND DATE_ADD(CURRENT_DATE(), INTERVAL (6 - WEEKDAY(CURRENT_DATE())) DAY) AND users_id = ?;'

     db.query(sql,[userId],(err,result)=>{
          if(err){
            console.log('오류 : ', err);
            return callback({code : 'feedback_error', message : '캘린더 오류', error : err});
        }

        console.log(result) 

        return callback(null,result);


    })
}



module.exports={
   TwTODO
};