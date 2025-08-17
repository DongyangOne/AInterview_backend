const db = require('../../config/database');

//backend-2
//일정 조회
const TwTODO=(userId,callback)=>{
    const sql=
    `SELECT calendar_id, title, time FROM calendar WHERE DATE(time) BETWEEN 
    DATE_SUB(CURRENT_DATE(), INTERVAL (DAYOFWEEK(CURRENT_DATE()) - 1) DAY)
    AND DATE_ADD(CURRENT_DATE(), INTERVAL (7 - DAYOFWEEK(CURRENT_DATE())) DAY)
    AND users_id = ?
    ORDER BY created_at DESC;`
     db.query(sql,[userId],(err,result)=>{
          if(err){
            console.log('twtodo오류 : ', err);

            return callback(err);
        }
        console.log(result)
        return callback(null,result);
    })
}

//backend-3
//최근 피드백 조회
const recentFeedback=(userId,callback)=>{
    const sql=
    `SELECT feedback_id, userId, title, content, created_at, datediff(date(now()), date(created_at)) as days_ago
    FROM feedback WHERE userId = ? ORDER BY created_at DESC LIMIT 1`;
     db.query(sql,[userId],(err,result)=>{
          if(err){
            console.log('recentFeedback오류 : ', err);
            return callback(err);
        }
        console.log(result)
        return callback(null,result);
    })
}

//backend-4
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

module.exports = {
    TwTODO,
    recentFeedback,
    todayQuestion
}