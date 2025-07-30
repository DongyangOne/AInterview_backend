const FeedbackModel = require('../../models/allModel');

exports.sortFeedbacks = (req, res) => {
  const { by } = req.query;
  
  let orderBy;
  if (by === 'alpha') {
    orderBy = 'title ASC';      // 가나다순
  } else {
    orderBy = 'created_at DESC';      // 날짜순
  }

  FeedbackModel.sortFeedbacks(orderBy, (err, result) => {
    if (err) {
      console.error('피드백 정렬 오류:', err);
      return res.status(500).json({ error: err.message });
    }
     res.status(200).json({ success: true, data: result });
  });
};