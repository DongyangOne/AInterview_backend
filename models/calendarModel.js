const db = require('../config/database');

const getCalendarAdd = (userId, year, title, time, importance, memo, callback) => {
    const sql = `insert into calendar (users_id, year, title, time, importance, memo)
    values (?, ?, ?, ?, ?, ?)`;

    db.query(sql, [userId, year, title, time, importance, memo], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

const getCalendarDelete = (calendar_id, callback) => {
    const sql = `delete from calendar where calendar_id = ?`;
    db.query(sql, [calendar_id], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

const getCalendarUpdate = (userId, year, title, time, importance, memo, callback) => { //모든 컬럼을 한 번에 수정하지 않고 하나하나 컬럼을 수정할 수 있게 함
    let sql = `update calendar set `;
    const arr = [], values = [];

    if (year !== undefined){
        arr.push(`year = ?`);
        values.push(year);
    }

    if (title !== undefined){
        arr.push(`title = ?`);
        values.push(title);
    }

    if (time !== undefined){
        arr.push(`time = ?`);
        values.push(time);
    }

    if (importance !== undefined){
        arr.push(`importance = ?`);
        values.push(importance);
    }

    if (memo !== undefined){
        arr.push(`memo = ?`);
        values.push(memo);
    }

    sql += arr.join(`, `) + `where users_id = ?`;
    values.push(userId);

    db.query(sql, values, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};


module.exports = {
    getCalendarAdd, getCalendarDelete, getCalendarUpdate
};
