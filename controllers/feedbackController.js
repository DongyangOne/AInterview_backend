const feedbackModel = require('../models/feedbackModel');

exports.getAllFeedback = (req, res) => {
  const { userId } = req.params;
    
  feedbackModel.findAllByUserId({ userId }, (err, feedbackList) => {
    if (err) {
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }
    res.status(200).json({ success: true, message: '모든 피드백 조회 성공', data: feedbackList });
  });
};