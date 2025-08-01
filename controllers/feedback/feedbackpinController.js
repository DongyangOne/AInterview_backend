const {pinFeedback, unpinFeedback}  = require('../../models/feedback/feedbackModel');

// 피드백 상단 고정
const getPin = (req, res) => {
  const { feedback_id } = req.params;

  if (!feedback_id) {
    return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다 (feedback_id)' });
  }

  pinFeedback(feedback_id, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: '피드백 상단 고정 실패', error: err.message });
    }
    res.status(200).json({ success: true, message: '피드백 상단 고정 완료', data: result });
  });
};

// 피드백 상단 고정 해제
const getUnpin = (req, res) => {
  const { feedback_id } = req.params;

  if (!feedback_id) {
    return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다 (feedback_id)' });
  }

  unpinFeedback(feedback_id, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: '피드백 상단 고정 해제 실패', error: err.message });
    }
    res.status(200).json({ success: true, message: '피드백 상단 고정 해제 완료', data: result });
  });
};

module.exports = {
  getPin,
  getUnpin
}