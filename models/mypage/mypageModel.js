const db = require('../../config/database');

//backend-20
const myInfo = (id, callback) => {    //id : 유저식별번호
    const sql = `
        select user_id, nickname, image_url
        from users
        where id = ?;
    `;
    db.query(sql, [id], (err, result) => {
        if (err) {
            //console.log('db오류 : ', err);
            return callback({ code: 'DB_ERROR', message: 'db오류', error: err });
        }else{
            callback(null, result);
        }
    })
}

//backend-21
//비밀번호 일치 확인
const pwCheck = (id, pw, callback)=>{
    const sql = `
        select password
        from users
        where id = ?;
    `;
    db.query(sql, [id], (err, result)=>{
        if(err){
            //console.log('db오류');
            return callback({ code: 'DB_ERROR', message: 'db오류', error: err });
        }else{
            if(result[0].password !== pw){
                //console.log('잘못된 비밀번호');
                return callback({code : 'INVALID_PASSWORD', message : '잘못된 비밀번호'});
            }
            else{
                //console.log('올바른 비밀번호');
                callback(null, true);
            }
        }
    })
}

//비밀번호 변경
const updatePw = (id, pw, callback)=>{
    const sql = `
        update users
        set password = ?
        where id = ?;
    `;
    db.query(sql, [pw, id], (err, result)=>{
        if(err){
            //console.log('db오류');
            return callback({ code: 'DB_ERROR', message: 'db오류', error: err });
        }else{
            //console.log('비밀번호 변경 완료');
            callback(null, true);
        }
    })
}

//backend-22
//닉네임 변경
const updateName = (id, nickname, callback)=>{
    const sql = `
        update users
        set nickname = ?
        where id = ?;
    `;
    db.query(sql, [nickname, id], (err, result)=>{
        if(err){
            //console.log('db오류');
            return callback(err);
        }
        else{
            //console.log('닉네임 변경 완료');
            callback(null, true);
        }
    })
}

//backend-23
//앱 푸시 데이터 불러오기
const getAppPush = (id, callback)=>{
    const sql = `
        select push_agreed
        from users
        where id = ?;
    `;
    db.query(sql, [id], (err, result)=>{
        if(err){
            //console.log('db오류');
            return callback(err);
        }
        else{
            //console.log('사용자의 앱 푸시 데이터 불러오기 성공');
            return callback(null, result);
        }
    })
}

//backend-24
//앱 푸시 정보 업데이트
const updateAppPush = (id, appPush, callback)=>{
    const sql = `
        update users
        set push_agreed = ?
        where id = ?;
    `;
    db.query(sql, [appPush, id], (err, result)=>{
        if(err){
            //console.log('db오류');
            return callback(err);
        }
        else{
            //console.log('앱 푸시 업데이트 성공');
            return callback(null, true);
        }
    })
}

//backend-25
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

        //console.log('회원탈퇴 완료');
        callback(null, true);
    }catch(err){
        //console.log('에러 : ', err);
        callback(err);
    }
}

module.exports = {
    myInfo,
    pwCheck,
    updatePw,
    updateName,
    getAppPush,
    updateAppPush,
    getFeedCount,
    getFeedContent,
    deleteUser
}