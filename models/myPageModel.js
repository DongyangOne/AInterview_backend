const db = require('../config/database');

const myInfo = (id, callback) => {    //id : 유저식별번호
    const sql = `
        select user_id, nickname, image_url
        from users
        where id = ?;
    `;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('db오류 : ', err);
            return callback({ code: 'DB_ERROR', message: 'db오류', error: err });
        }else{
            callback(null, result);
        }
    })
}

module.exports = {
    myInfo
}