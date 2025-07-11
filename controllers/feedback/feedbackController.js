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

exports.updateFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { title, memo } = req.body;
    const userId = 1;

    if (!title && !memo) {
      return res.status(400).json({
        success: false,
        message: '수정할 제목이나 메모를 입력해주세요.'
      });
    }

    let result;
    let message = '피드백이 성공적으로 수정되었습니다.';

    if (title) {
      result = await feedbackModel.updateTitle({ feedbackId, title, userId });
      message = '피드백 제목이 성공적으로 수정되었습니다.';
    }

    if (memo) {
      result = await feedbackModel.updateMemo({ feedbackId, memo, userId });
      message = '피드백 메모가 성공적으로 수정되었습니다.';
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: '해당 ID의 피드백을 찾을 수 없거나 수정 권한이 없습니다.'
      });
    }

    res.status(200).json({ success: true, message });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.',
      error: error.message
    });
  }
};