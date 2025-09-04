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
    `SELECT 
    f.feedback_id,
    f.userId,
    f.title,
    f.content,
    f.created_at,
    DATEDIFF(NOW(), f.created_at) AS days_ago,
    a.analysisId,
    a.pose,
    a.confidence,
    a.facial,
    a.risk_response,
    a.tone,
    a.understanding
FROM feedback AS f
JOIN analysis AS a 
    ON f.feedback_id = a.feedback_id
WHERE f.userId = ?
ORDER BY f.created_at DESC
LIMIT 1;`

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
            console.log('todayQuestion sql 오류 : ', err);
            return callback(err);
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