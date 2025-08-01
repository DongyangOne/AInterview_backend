const feedbackModel = require('../../models/feedback/feedbackModel');

//  기존 제목 불러오기
exports.getFeedbackTitle = (req, res) => {

  const { userId, feedbackId } = req.params;

  feedbackModel.findTitleById({ feedbackId, userId }, (err, data) => {

    if (err) return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    
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

    
    res.status(200).json({ success: true, message: '피드백 제목이 성공적으로 수정되었습니다.' });
  });
};