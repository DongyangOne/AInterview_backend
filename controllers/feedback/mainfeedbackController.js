const mainfeedbackModel = require('../../models/mainfeedbackModel');

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};

exports.getAllFeedback = (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다." });
  }
  mainfeedbackModel.findAllByUserId({ userId }, (err, feedbackList) => {
    if (err) {
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }
    if (!feedbackList || feedbackList.length === 0) {
      return res.status(404).json({ success: false, message: "url 오류 발생" });
    }
    const formattedList = feedbackList.map(feedback => ({
      id: feedback.id,
      title: feedback.title,
      memo: feedback.memo,
      created_at: formatDate(feedback.created_at)
    }));

    res.status(200).json({
      success: true,
      message: '모든 피드백 조회 성공',
      data: formattedList
    });
  });
};
