const feedbackModel = require('../../models/feedbackModel');

exports.getFeedbackMemo = (req, res) => {
  const { userId, feedbackId } = req.params;
  feedbackModel.findMemoById({ feedbackId, userId }, (err, data) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    if (!data) return res.status(404).json({ success: false, message: '피드백을 찾을 수 없습니다.' });
    res.status(200).json({ success: true, message: '기존 메모 조회 성공', data });
  });
};

exports.updateFeedbackMemo = (req, res) => {
  const { userId, feedbackId } = req.params;
  const { memo } = req.body;
  if (memo === undefined) return res.status(400).json({ success: false, message: '수정할 메모를 입력해주세요.' });
  if (memo.length > 50) return res.status(400).json({ success: false, message: '메모는 50자 이하로 입력해주세요.' });

  feedbackModel.updateMemo({ feedbackId, memo, userId }, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: '피드백을 찾을 수 없거나 수정 권한이 없습니다.' });
    res.status(200).json({ success: true, message: '피드백 메모가 성공적으로 수정되었습니다.' });
  });
};