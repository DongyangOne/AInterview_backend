const feedbackModel = require('../../models/feedback/feedbackModel');

exports.getFeedbackList = async (req, res) => {
  try {
    const userId = req.query.userId || 1;
    const { search, sort } = req.query;

    const feedbackList = await feedbackModel.findAll({ userId, search, sort });

    res.status(200).json({
      success: true,
      message: '피드백 목록 조회 성공',
      data: feedbackList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
      error: error.message
    });
  }
};