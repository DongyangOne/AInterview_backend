const db = require('../config/database');

const getUserNotices = (userId, callback) => {
    const sql = `
        SELECT notice_id, title, content, created_at
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
    insertNotice,
};