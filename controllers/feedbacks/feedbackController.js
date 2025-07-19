const feedbackModel = require('../../models/feedbackModel');

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};

exports.getAllFeedback = (req, res) => {
  const { userId } = req.params;
  feedbackModel.findAllByUserId({ userId }, (err, feedbackList) => {
    if (err) {
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
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










