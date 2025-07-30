const db = require('../config/database');

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

module.exports = {
    getUserDay
}; //MODEL
