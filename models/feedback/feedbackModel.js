const db = require('../../config/database');

//backend-7 mainfeedbackModel 리스트 조회
const findAllByUserId = ({ userId }, callback) => {
  const sql = `
    SELECT feedback_id AS id, title, memo, created_at
    FROM feedback
    WHERE userId = ?
    ORDER BY created_at DESC
  `;
  db.query(sql, [userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};

//backend-8
// 제목조회
const findTitleById = ({ feedbackId, userId }, callback) => {
  const sql = "SELECT title FROM feedback WHERE feedback_id = ? AND userId = ?";
  db.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};

// 8번: 제목 수정
const updateTitle = ({ feedbackId, title, userId }, callback) => {
  const sql = "UPDATE feedback SET title = ?, updated_at = NOW() WHERE feedback_id = ? AND userId = ?";
  db.query(sql, [title, feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

//backend-9 memofeedbackModel
//메모 조회
const findMemoById = ({ feedbackId, userId }, callback) => {
  const sql = "SELECT memo FROM feedback WHERE feedback_id = ? AND userId = ?";
  db.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};

// 9번: 메모 수정
const updateMemo = ({ feedbackId, memo, userId }, callback) => {
  if (memo.length > 50) {
    return callback(new Error('메모는 50자 이하로 입력해주세요.'), null);
  }
  const sql = "UPDATE feedback SET memo = ?, updated_at = NOW() WHERE feedback_id = ? AND userId = ?";
  db.query(sql, [memo, feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

//backend-10
const searchFeedbacks = (userId, keyword, callback) => {
  const sql = `
    SELECT feedback_id, userId, title, memo, pin, created_at
    FROM feedback
    WHERE userId = ? AND (title LIKE ? OR memo LIKE ?)
    ORDER BY created_at DESC
  `;
  db.query(sql, [userId, `%${keyword}%`, `%${keyword}%`], (err, results) => {
    if (err) {
      logModelError({ location: 'searchFeedbacks', params: { userId, keyword }, message: 'DB 피드백 검색 오류', error: err.message });
      return callback(err);
    }
    callback(null, results);
  });
};

//backend-11
const sortFeedbacks = (userId, orderBy, callback) => {
  const sql = `
    SELECT feedback_id, userId, title, memo, pin, created_at
    FROM feedback
    WHERE userId = ?
    ORDER BY pin DESC, ${orderBy}
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) {
      logModelError({ location: 'sortFeedbacks', params: { userId, orderBy }, message: 'DB 피드백 정렬 오류', error: err.message });
      return callback(err);
    }
    callback(null, results);
  });
};

//backend-12
const pinFeedback = (feedbackId, userId, callback) => {
  const sql = "UPDATE feedback SET pin = 'Y' WHERE feedback_id = ? AND userId = ?";
  db.query(sql, [feedbackId, userId], (err, result) => {
    if (err) {
      logModelError({ location: 'pinFeedback', params: { feedbackId, userId }, message: 'DB 피드백 상단 고정 오류', error: err.message });
      return callback(err);
    }
    callback(null, result);
  });
};

const unpinFeedback = (feedbackId, userId, callback) => {
  const sql = "UPDATE feedback SET pin = 'N' WHERE feedback_id = ? AND userId = ?";
  db.query(sql, [feedbackId, userId], (err, result) => {
    if (err) {
      logModelError({ location: 'unpinFeedback', params: { feedbackId, userId }, message: 'DB 피드백 상단 고정 해제 오류', error: err.message });
      return callback(err);
    }
    callback(null, result);
  });
};

//backend-13
const deleteById = ({ feedbackId, userId }, callback) => {
  const sql = `
    DELETE FROM feedback
    WHERE feedback_id = ? AND userId = ?
  `;
  db.query(sql, [feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

//backend-14
const findById = ({ feedbackId, userId }, callback) => {
  const sql = `
    SELECT 
      feedback_id AS id, 
      userId, 
      title, 
      content, 
      memo, 
      created_at
    FROM feedback
    WHERE feedback_id = ? AND userId = ?
  `;
  db.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};

module.exports = {
    findAllByUserId,
    findTitleById,
    updateTitle,
    findMemoById,
    updateMemo,
    searchFeedbacks,
    sortFeedbacks,
    pinFeedback,
    unpinFeedback,
    deleteById,
    findById
}