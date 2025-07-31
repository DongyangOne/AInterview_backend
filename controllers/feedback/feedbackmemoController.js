const feedbackModel = require('../../models/feedbackmemoModel');

// 기존 메모 불러오기
exports.getFeedbackMemo = (req, res) => {
  const { userId, feedbackId } = req.params;

  feedbackModel.findMemoById({ feedbackId, userId }, (err, data) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
   
 
    res.status(200).json({ success: true, message: '기존 메모 조회 성공', data });
  });
};

// 9번: 메모 수정 
exports.updateFeedbackMemo = (req, res) => {
  const { userId, feedbackId } = req.params;
  const { memo } = req.body;
  if (memo === undefined) return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다' });
  if (memo.length > 50) return res.status(400).json({ success: false, message: '메모는 50자 이하로 입력해주세요.' });

  feedbackModel.updateMemo({ feedbackId, memo, userId }, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류', error: err.message });

    
    res.status(200).json({ success: true, message: '피드백 메모가 성공적으로 수정되었습니다.' });
  });
};
