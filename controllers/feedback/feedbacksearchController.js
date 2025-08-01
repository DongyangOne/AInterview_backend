const FeedbackModel = require('../../models/feedback/feedbackModel');

exports.searchFeedbacks = (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({
      success: false,
      message: "미입력 정보가 존재합니다 (keyword)"
    });
  }

  FeedbackModel.searchFeedbacks(keyword, (err, results) => {
    if (err) {
      console.error('피드백 검색 오류:', err);
      return res.status(500).json({
        success: false,
        message: "서버 오류",
        error: err.message
      });
    }
    
    return res.status(200).json({
      success: true,
      data: results
    });
  });
};