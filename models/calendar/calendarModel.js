const db = require('../../config/database');

//backend-15 daymodel
const getUserDay = (userId, year, month, day, callback) => {
    const sql = `select calendar_id, title, DATE_FORMAT(time, '%Y-%m-%d') AS 날짜,
    date_format(time, '%k:%i') as 시간,
    CASE DAYOFWEEK(time)
        WHEN 1 THEN '일'
        WHEN 2 THEN '월'
        WHEN 3 THEN '화'
        WHEN 4 THEN '수'
        WHEN 5 THEN '목'
        WHEN 6 THEN '금'
        WHEN 7 THEN '토' END as 요일, 
        CASE importance
        when 'S' then '매우 중요'
        when 'I' then '중요'
        when 'N' then 'X'
        end as importance, memo 
    from calendar where users_id = ? and YEAR(time) = ? and MONTH(time) = ? and DAY(time) =?
    order by created_at desc`;

    db.query(sql, [userId, year, month, day], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

//backend-16 monthModel
const getUserMonth = (userId, year, month, callback) => {
    const sql = `select date_format(time, '%Y') as 년도, date_format(time, '%m') as 월, calendar_id, date_format(time, '%d') as 일, title
    from calendar where users_id = ? and YEAR(time) = ? and MONTH(time) = ?
    order by created_at desc`;

    db.query(sql, [userId, year, month], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

//backend-17 dateaddModel
const createDate = (userId, title, time, importance, memo, callback) => {
    const sql = `insert into calendar (users_id, title, time, importance, memo)
    values (?, ?, ?, ?, ?)`;

    db.query(sql, [userId, title, time, importance, memo], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

//backend-18 dateupdateModel
const getCalendarUpdate = (calendar_id, userId, title, time, importance, memo, callback) => { //모든 컬럼을 한 번에 수정하지 않고 하나하나 컬럼을 수정할 수 있게 함
    let sql = `update calendar set `;
    const arr = [], values = [];

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

    sql += arr.join(`, `) + ` where users_id = ? and calendar_id = ?`;
    values.push(userId);
    values.push(calendar_id)

    db.query(sql, values, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

//backend-19 datedeleteModel
const getCalendarDelete = (calendar_id, callback) => {
    const sql = `delete from calendar where calendar_id = ?`;
    db.query(sql, [calendar_id], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = {
    getUserDay,
    getUserMonth,
    createDate,
    getCalendarUpdate,
    getCalendarDelete
}