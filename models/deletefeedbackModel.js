const connection = require('../config/database');

exports.deleteById = ({ feedbackId, userId }, callback) => {
  const sql = `
    DELETE FROM feedback
    WHERE feedback_id = ? AND userId = ?
  `;
  connection.query(sql, [feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};




