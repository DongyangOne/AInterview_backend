const db = require('../config/database');

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
    getUserNotices,
    updateUserPushToken,
    markNoticeRead,
    insertNotice,
};