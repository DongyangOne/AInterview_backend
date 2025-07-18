const connection = require('../config/database');

exports.findAllByUserId = ({ userId }, callback) => {
  const sql = `
    SELECT feedback_id as id, title, memo 
    FROM feedback 
    WHERE userId = ? 
    ORDER BY feedback_id DESC
  `;
    connection.query(sql, [userId], (err, rows) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, rows);
  });
};