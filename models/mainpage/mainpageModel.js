const db = require('../../config/database');

//backend-2
//일정 조회
const TwTODO=(userId,callback)=>{
    const sql=
    'SELECT calendar_id, title,time FROM calendar WHERE  DATE(time) BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL WEEKDAY(CURRENT_DATE()) DAY) AND DATE_ADD(CURRENT_DATE(), INTERVAL (6 - WEEKDAY(CURRENT_DATE())) DAY) AND users_id = ?;'
     db.query(sql,[userId],(err,result)=>{
          if(err){
            console.log('오류 : ', err);
            return callback({code : 'calendar_error', message : '캘린더 오류', error : err});
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
            console.log('오류 : ', err);
            return callback({code : 'feedback_error', message : '피드백오류', error : err});
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

//backend-5/6
const getUserNotices = (userId, callback) => {
    const sql = `
        SELECT notice_id, title, content, created_at, is_read
        FROM notice
        WHERE users_id = ?
        ORDER BY created_at DESC
    `;
    db.query(sql, [userId], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

const updateUserPushToken = (userId, pushToken, callback) => {
    const sql = `
        UPDATE users
        SET push_token = ?
        WHERE id = ?
    `;
    db.query(sql, [pushToken, userId], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
}

const markNoticeRead = (userId, noticeId, callback) => {
    let sql = `
        UPDATE notice
        SET is_read = 'Y'
        WHERE users_id = ?
    `;
    const params = [userId];

    if (noticeId) {
        sql += ' AND notice_id = ?';
        params.push(noticeId);
    }

    db.query(sql, params, (err, results) => {
        if (err) return callback(err);

        if (results.affectedRows === 0) {
            return callback(new Error('해당 알림이 존재하지 않거나 이미 읽음 처리되었습니다.'));
        }
        
        callback(null, results);
    });
};

const insertNotice = (userId, title, content, callback) => {
    const sql = `
        INSERT INTO notice (title, content, users_id)
        VALUES (?, ?, ?)
    `;
    db.query(sql, [title, content, userId], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = {
    TwTODO,
    recentFeedback,
    todayQuestion,
    getUserNotices,
    updateUserPushToken,
    markNoticeRead,
    insertNotice,
}