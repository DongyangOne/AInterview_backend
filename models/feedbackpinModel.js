const db = require('../config/database');

const pinFeedback = (feedback_id, callback) => {
  const sql = "UPDATE feedback SET pin = 'Y' WHERE feedback_id = ?";
  db.query(sql, [feedback_id], (err, result)=> {
    if (err){
      return callback(err);
    }
    else {
      return callback(null, result);
    }
  });
};

const unpinFeedback = (feedback_id, callback) => {
  const sql = "UPDATE feedback SET pin = 'N' WHERE feedback_id = ?";
  db.query(sql, [feedback_id], (err, result) =>{
    if (err) {
      return callback(err);
    }
    else {
      return callback(null, result);
    }
  });
};

module.exports = {
  pinFeedback, unpinFeedback
}