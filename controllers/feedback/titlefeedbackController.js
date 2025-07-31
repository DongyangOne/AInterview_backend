const feedbackModel = require('../../models/titlefeedbackModel');

//  기존 제목 불러오기
exports.getFeedbackTitle = (req, res) => {

  const { userId, feedbackId } = req.params;

  feedbackModel.findTitleById({ feedbackId, userId }, (err, data) => {

    if (err) return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    if (!data) return res.status(404).json({ success: false, message: ' 해당 피드백을 찾을 수 없습니다.' });
    res.status(200).json({ success: true, message: '기존 제목 조회 성공', data });
  });
};

// 8번: 제목 수정 
exports.updateFeedbackTitle = (req, res) => {
  const { userId, feedbackId } = req.params;
  const { title } = req.body;

  if (!title) return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다(title)' });
  if (title.length > 20) return res.status(400).json({ success: false, message: '제목은 20자 이하로 입력해주세요.' });
  
  feedbackModel.updateTitle({ feedbackId, title, userId }, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류', error: err.message });

    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: '피드백을 찾을 수 없거나 수정 권한이 없습니다.' });
    res.status(200).json({ success: true, message: '피드백 제목이 성공적으로 수정되었습니다.' });
  });
};