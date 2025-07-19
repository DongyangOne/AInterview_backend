const db = require('../config/database');

const getUserMonth = (userId, year, month, callback) => {
    const sql = `select \`year\` , date_format(time, '%m') as 월, calendar_id, date_format(time, '%d') as 일, title
    from calendar where users_id = ? and \`year\` = ? and MONTH(time) = ?
    order by created_at desc`;

    db.query(sql, [userId, year, month], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = {
    getUserMonth
};
