const db = require('../../config/database');

//backend-0
const loginCheck = (userId, password, callback)=>{
    const sql = `
        select id, user_id, password, nickname
        from users
        where user_id = ?
    `;
    db.query(sql, [userId], (err, result)=>{
        if(err){
            //console.log('db오류 : ', err);
            return callback({code : 'DB_ERROR', message : 'db오류', error : err});
        }

        if(result.length == 0){
            //console.log('존재하지 않는 아이디');
            return callback({code : 'USER_NOT_FOUND', message : '존재하지 않는 아이디'});
        }
        else{
            if(result[0].password != password){
                //console.log('잘못된 비밀번호');
                return callback({code : 'INVALID_PASSWORD', message : '잘못된 비밀번호'});
            }else{
                //console.log('로그인 성공');
                callback(null, result);
            }
        }
    })
};

//backend-1
const addUser = (userId, userName, password, appPush, callback)=>{ //모든 조건 충족 시 실행하는 회원가입 함수
    const sql = `
        insert into users(user_id, nickname, password, service_agreed, push_agreed)
        values (?, ?, ?, 'Y', ?)
    `;
    db.query(sql, [userId, userName, password, appPush], (err, result)=>{
        if(err){
            //console.log('db오류 : ', err);
            return callback({code : 'DB_ERROR', message : 'db오류', error : err});
        }else{
            //console.log('회원가입 완료');
            callback(null, true);
        }
    })
};

//backend-1
const userIdCheck = (userId, callback) =>{ //아이디 중복 확인
    const sql = `
        select user_id
        from users
        where user_id = ?
    `;
    db.query(sql, [userId], (err, result)=>{
        if(err){
            //console.log('db오류 : ', err);
            return callback({code : 'DB_ERROR', message : 'db오류', error : err});
        }
        
        if(result.length > 0){
            //console.log('사용중인 아이디');
            return callback({code : 'ID_DUPLICATE', message : '사용중인 아이디'});
        }else{
            //console.log('사용가능한 아이디');
            callback(null, true);
        }
    })
}


module.exports = {
    loginCheck,
    addUser,
    userIdCheck
}