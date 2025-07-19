const feedbackModel = require('../../models/feedbackModel');

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};

exports.getFeedbackTitle = (req, res) => {
  const { userId, feedbackId } = req.params;
  feedbackModel.findTitleById({ feedbackId, userId }, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }
    if (!result) {
      return res.status(404).json({ success: false, message: '피드백을 찾을 수 없습니다.' });
    }

    res.status(200).json({
      success: true,
      message: '기존 제목 조회 성공',
      data: {
        title: result.title,
        created_at: formatDate(result.created_at)
      }
    });
  });
};

exports.updateFeedbackTitle = (req, res) => {
  const { userId, feedbackId } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: '수정할 제목을 입력해주세요.' });
  }

  feedbackModel.updateTitle({ feedbackId, title, userId }, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: '피드백을 찾을 수 없거나 수정 권한이 없습니다.' });
    }

    feedbackModel.findTitleById({ feedbackId, userId }, (err2, updated) => {
      if (err2) {
        return res.status(500).json({ success: false, message: '수정 후 데이터 조회 실패', error: err2.message });
      }

      res.status(200).json({
        success: true,
        message: '피드백 제목이 성공적으로 수정되었습니다.',
        data: {
          title: updated.title,
          created_at: formatDate(updated.created_at)
        }
      });
    });
  });
};

exports.updateTitle = async (req, res) => {
  try {
    const { userId, feedbackId } = req.params;
    const { title } = req.body;

    if (typeof title !== 'string' || title.length > 20) {
      return res.status(400).json({
        success: false,
        message: "제목은 20자 이하로 입력해주세요."
      });
    }

    const feedback = await Feedback.findOne({ where: { id: feedbackId, userId } });
    if (!feedback) {
      return res.status(404).json({ success: false, message: "피드백을 찾을 수 없거나 수정 권한이 없습니다." });
    }

    await feedback.update({ title });
    res.json({ success: true, message: "제목이 수정되었습니다." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "서버 오류입니다." });
  }
};


