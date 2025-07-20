const e = require('express');
const db = require('../config/database');

//비밀번호 일치 확인
const pwCheck = (id, pw, callback)=>{
    const sql = `
        select password
        from users
        where id = ?;
    `;
    db.query(sql, [id], (err, result)=>{
        if(err){
            console.log('db오류');
            return callback({ code: 'DB_ERROR', message: 'db오류', error: err });
        }else{
            if(result[0].password !== pw){
                console.log('잘못된 비밀번호');
                return callback({code : 'INVALID_PASSWORD', message : '잘못된 비밀번호'});
            }
            else{
                console.log('올바른 비밀번호');
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
            console.log('db오류');
            return callback({ code: 'DB_ERROR', message: 'db오류', error: err });
        }else{
            console.log('비밀번호 변경 완료');
            callback(null, true);
        }
    })
}

//닉네임 변경
const updateName = (id, nickname, callback)=>{
    const sql = `
        update users
        set nickname = ?
        where id = ?;
    `;
    db.query(sql, [nickname, id], (err, result)=>{
        if(err){
            console.log('db오류');
            return callback(err);
        }
        else{
            console.log('닉네임 변경 완료');
            callback(null, true);
        }
    })
}

//앱 푸시 데이터 불러오기
const getAppPush = (id, callback)=>{
    const sql = `
        select push_agreed
        from users
        where id = ?;
    `;
    db.query(sql, [id], (err, result)=>{
        if(err){
            console.log('db오류');
            return callback(err);
        }
        else{
            console.log('사용자의 앱 푸시 데이터 불러오기 성공');
            return callback(null, result);
        }
    })
}

//앱 푸시 정보 업데이트
const updateAppPush = (id, appPush, callback)=>{
    const sql = `
        update users
        set push_agreed = ?
        where id = ?;
    `;
    db.query(sql, [appPush, id], (err, result)=>{
        if(err){
            console.log('db오류');
            return callback(err);
        }
        else{
            console.log('앱 푸시 업데이트 성공');
            return callback(null, true);
        }
    })
}



module.exports = {
    pwCheck,
    updatePw,
    updateName,
    getAppPush,
    updateAppPush
}