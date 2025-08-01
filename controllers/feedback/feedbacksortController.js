const FeedbackModel = require('../../models/feedback/feedbackModel');

exports.sortFeedbacks = (req, res) => {
  const { by } = req.query;

  if (!by) {
    return res.status(400).json({
      success: false,
      message: "미입력 정보가 존재합니다 (by)"
    });
  }

  let orderBy;
  if (by === 'alpha') {
    orderBy = 'title ASC';
  } else if (by === 'date') {
    orderBy = 'created_at DESC';
  } else {
    return res.status(400).json({
      success: false,
      message: "정렬 기준이 올바르지 않습니다 (by: alpha | date)"
    });
  }

  FeedbackModel.sortFeedbacks(orderBy, (err, result) => {
    if (err) {
      console.error('피드백 정렬 오류:', err);
      return res.status(500).json({
        success: false,
        message: "서버 오류",
        error: err.message
      });
    }
    return res.status(200).json({
      success: true,
      data: result
    });
  });
};