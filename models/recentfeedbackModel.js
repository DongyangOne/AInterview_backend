const db = require('../config/database');




//최근 피드백 조회
const recentFeedback=(userId,callback)=>{


    const sql=
    `SELECT feedback_id, userId, title, content, created_at, datediff(date(now()), date(created_at)) as days_ago
    FROM feedback WHERE userId = ? ORDER BY created_at DESC LIMIT 1`;

     db.query(sql,[userId],(err,result)=>{
          if(err){
            console.log('오류 : ', err);
            return callback({code : 'feedback_error', message : '피드백오류', error : err});
        }

        console.log(result)

        return callback(null,result);


    })
}



module.exports={
    recentFeedback
};