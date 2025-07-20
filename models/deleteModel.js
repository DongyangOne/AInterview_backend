const db = require('../config/database');

//탈퇴하는 회원 정보 불러오기
//피드백 총 개수
const getFeedCount = (id, callback)=>{
    const sql = `
        select count(*) as feedback_count
        from feedback
        where userId = ?;
    `;
    db.query(sql, [id], (err, result)=>{
        if(err){
            return callback(err);
        }
        else{
            return callback(null, result);
        }
    })
}

//피드백 내용(제목, 날짜)
const getFeedContent = (id, callback)=>{
    const sql = `
        select title, created_at
        from feedback
        where userId = ?
        order by created_at desc
    `
    db.query(sql, [id], (err, results)=>{
        if(err){
            return callback(err);
        }
        else{
            return callback(null, results);
        }
    })
}

//탈퇴를 위한 promise (db실행) 함수
function queryAsync(sql, params){
    return new Promise((resolve, reject)=>{
        db.query(sql, params, (err, result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result)
            }
        })
    })
}


//회원탈퇴
 const deleteUser = async (user_id, callback)=>{
    try{
        const feedbacks = await queryAsync('select feedback_id from feedback where userId = ?', [user_id]);
        for(let i = 0; i < feedbacks.length; i++){
            feed_id = feedbacks[i].feedback_id;
            await queryAsync('delete from analysis where feedback_id = ?', [feed_id]);
            await queryAsync('delete from feedback where feedback_id = ?', [feed_id]);
        }
        
        const questions = await queryAsync('select questions_id from questions where users_id = ?', [user_id]);
        for(let i = 0; i < questions.length; i++){
            question_id = questions[i].questions_id;
            await queryAsync('delete from interviews where questions_id = ?', [question_id]);
        }

        await queryAsync('delete from interviews where users_id = ?', [user_id]);
        await queryAsync('delete from questions where users_id = ?', [user_id]);
        await queryAsync('delete from notice where users_id = ?', [user_id]);
        await queryAsync('delete from feedback where userId = ?', [user_id]);
        await queryAsync('delete from calendar where users_id = ?', [user_id]);
        await queryAsync('delete from users where id = ?', [user_id]);

        console.log('회원탈퇴 완료');
        callback(null, true);
    }catch(err){
        console.log('에러 : ', err);
        callback(err);
    }
}

module.exports = {
    getFeedCount,
    getFeedContent,
    deleteUser
}