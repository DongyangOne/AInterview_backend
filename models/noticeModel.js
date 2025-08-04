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

module.exports = {
    getUserNotices,
};