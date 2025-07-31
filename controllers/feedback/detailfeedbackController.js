const feedbackModel = require('../../models/detailfeedbackModel');

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};


exports.getFeedbackDetail = (req, res) => {
  const { userId, feedbackId } = req.params;
if (!userId || !feedbackId) {
    return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다." });
  }

  feedbackModel.findById({ feedbackId, userId }, (err, feedback) => {
    if (err) {
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
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