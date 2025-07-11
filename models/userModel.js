const db = require('../config/database');

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


module.exports = {
    pwCheck,
    updatePw
}