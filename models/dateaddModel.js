const db = require('../config/database');

const getCalendarAdd = (userId, year, title, time, importance, memo, callback) => {
    const sql = `insert into calendar (users_id, year, title, time, importance, memo)
    values (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [userId, year, title, time, importance, memo], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = {
    getCalendarAdd
};