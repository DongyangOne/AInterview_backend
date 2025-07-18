const db = require('../../config/database');




//최근 피드백 조회
const recentFeedback=(userId,callback)=>{


    const sql=
    'select *from feedback where feedback_id = (SELECT max(feedback_id) FROM feedback) AND user_id=?;';

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