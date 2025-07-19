const db = require('../config/database');

const getCalendarDelete = (calendar_id, callback) => {
    const sql = `delete from calendar where calendar_id = ?`;
    db.query(sql, [calendar_id], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = {
   getCalendarDelete
};
