const db = require('../../config/database');

//backend-7 mainfeedbackModel 리스트 조회
const findAllByUserId = ({ userId }, callback) => {
    const sql = `
    SELECT feedback_id AS id, title, memo, created_at, pin  
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
    const sql = 'SELECT title FROM feedback WHERE feedback_id = ? AND userId = ?';

    db.query(sql, [feedbackId, userId], (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, rows[0]);
    });
};

// 8번: 제목 수정
const updateTitle = ({ feedbackId, title, userId }, callback) => {
    const sql = 'UPDATE feedback SET title = ?, updated_at = NOW() WHERE feedback_id = ? AND userId = ?';

    db.query(sql, [title, feedbackId, userId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

//backend-9 memofeedbackModel
//메모 조회
const findMemoById = ({ feedbackId, userId }, callback) => {
    const sql = 'SELECT memo FROM feedback WHERE feedback_id = ? AND userId = ?';

    db.query(sql, [feedbackId, userId], (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, rows[0]);
    });
};

// 9번: 메모 수정
const updateMemo = ({ feedbackId, memo, userId }, callback) => {
    if (memo.length > 50) {
        return callback(new Error('메모는 50자 이하로 입력해주세요.'), null);
    }
    const sql = 'UPDATE feedback SET memo = ?, updated_at = NOW() WHERE feedback_id = ? AND userId = ?';

    db.query(sql, [memo, feedbackId, userId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
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
            logModelError({
                location: 'searchFeedbacks',
                params: { userId, keyword },
                message: 'DB 피드백 검색 오류',
                error: err.message,
            });
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
        if (err) return callback(err);
        callback(null, results);
    });
};

//backend-12
// 피드백 상단 고정
const pinFeedback = (feedbackId, userId, callback) => {
    const sql = "UPDATE feedback SET pin = 'Y' WHERE feedback_id = ? AND userId = ?";
    db.query(sql, [feedbackId, userId], (err, result) => {
        if (err) return callback(err);

        if (result.affectedRows === 0) {
            return callback(null, null);
        }

        const selectSql = 'SELECT pin FROM feedback WHERE feedback_id = ? AND userId = ?';
        db.query(selectSql, [feedbackId, userId], (err, rows) => {
            if (err) return callback(err);
            callback(null, rows[0]);
        });
    });
};

// 피드백 상단 고정 해제
const unpinFeedback = (feedbackId, userId, callback) => {
    const sql = "UPDATE feedback SET pin = 'N' WHERE feedback_id = ? AND userId = ?";
    db.query(sql, [feedbackId, userId], (err, result) => {
        if (err) return callback(err);

        if (result.affectedRows === 0) {
            return callback(null, null);
        }

        const selectSql = 'SELECT pin FROM feedback WHERE feedback_id = ? AND userId = ?';
        db.query(selectSql, [feedbackId, userId], (err, rows) => {
            if (err) return callback(err);
            callback(null, rows[0]);
        });
    });
};

//backend-13
const deleteById = ({ feedbackId, userId }, callback) => {
    const sql = `
    DELETE FROM feedback
    WHERE feedback_id = ? AND userId = ?
  `;

    db.query(sql, [feedbackId, userId], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

//backend-14
const findById = ({ feedbackId, userId }, callback) => {
    const sql = `
    SELECT 
    f.feedback_id AS id, 
    f.userId, 
    f.title, 
    f.good,
    f.bad,
    f.content,
    f.memo, 
    f.pin,
    f.created_at,
    a.pose,
    a.confidence,
    a.facial,
    a.risk_response,
    a.tone,
    a.understanding
FROM 
    feedback AS f
LEFT JOIN 
    analysis AS a ON f.feedback_id = a.feedback_id
WHERE 
    f.feedback_id = ? AND f.userId = ?
  `;

    db.query(sql, [feedbackId, userId], (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, rows[0] || null);
    });
};

//backend-26 피드백 생성
const createFeedback = (data, callback) => {
  
  const feedbackSql = `
    INSERT INTO feedback (userId, title, good, bad, content, memo) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const feedbackParams = [data.userId, data.title, data.good, data.bad, data.content, data.memo];

  db.query(feedbackSql, feedbackParams, (err, result) => {
    if (err) return callback(err, null);

    const newFeedbackId = result.insertId;

    
    const analysisSql = `
      INSERT INTO analysis (feedback_id, pose, confidence, facial, risk_response, tone, understanding) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const analysisParams = [
      newFeedbackId, data.pose, data.confidence, data.facial, 
      data.risk_response, data.tone, data.understanding
    ];

    db.query(analysisSql, analysisParams, (err, analysisResult) => {
      if (err) return callback(err, null);
      callback(null, { feedbackId: newFeedbackId });
    });
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
    findById,
    createFeedback
};
