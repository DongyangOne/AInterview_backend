const feedbackModel = require('../../models/feedbackModel');

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};


exports.getFeedbackDetail = (req, res) => {
  const { userId, feedbackId } = req.params;

  feedbackModel.findById({ feedbackId, userId }, (err, feedback) => {
    if (err) {
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }
    if (!feedback) {
      return res.status(404).json({ success: false, message: '피드백을 찾을 수 없습니다.' });
    }

    res.status(200).json({
      success: true,
      message: '피드백 상세 조회 성공',
      data: {
        ...feedback,
        created_at: formatDate(feedback.created_at)
      }
    });
  });
};