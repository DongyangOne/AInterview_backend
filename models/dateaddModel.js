const db = require('../config/database');

const createDate = (userId, title, time, importance, memo, callback) => {
    const sql = `insert into calendar (users_id, title, time, importance, memo)
    values (?, ?, ?, ?, ?)`;

    db.query(sql, [userId, title, time, importance, memo], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = {
    createDate
};

