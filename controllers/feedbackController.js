const feedbackModel = require('../models/feedbackModel');

const formatDate = (date) => {
  if (!date) return null;
   return new Date(date).toISOString().split('T')[0];
};

exports.getAllFeedback = (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다" });
  }
  feedbackModel.findAllByUserId(userId, (err, feedbackList) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류' });
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

exports.getFeedbackDetail = (req, res) => {
  const { userId, feedbackId } = req.params;
  if (!userId || !feedbackId) {
    return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다" });
  }
  feedbackModel.findById(feedbackId, userId, (err, feedback) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류' });
    if (!feedback) {
      return res.status(404).json({ success: false, message: 'url 오류' });
    }
    res.status(200).json({
      success: true,
      message: '피드백 상세 조회 성공',
      data: {
        ...feedback,
        created_at: formatDate(feedback.created_at)
      }
    });
  });
};

exports.deleteFeedback = (req, res) => {
  const { userId, feedbackId } = req.params;
  if (!userId || !feedbackId) {
    return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다" });
  }
  feedbackModel.deleteById(feedbackId, userId, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류' });
    if (result.affectedRows === 0) {
      return res.status(403).json({ success: false, message: '토큰은 존재하나 사용자를 특정할 수 없습니다' });
    }
    res.status(200).json({
      success: true,
      message: '피드백이 성공적으로 삭제되었습니다.'
    });
  });
};

exports.getFeedbackTitle = (req, res) => {
  const { userId, feedbackId } = req.params;
  if (!userId || !feedbackId) {
    return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다" });
  }
  feedbackModel.findTitleById(feedbackId, userId, (err, data) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류' });
    if (!data) return res.status(404).json({ success: false, message: 'url 오류' });
    res.status(200).json({ success: true, message: '제목 조회 성공', data });
  });
};

exports.updateFeedbackTitle = (req, res) => {
  const { userId, feedbackId } = req.params;
  const { title } = req.body;
  if (!userId || !feedbackId || !title) {
    return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다" });
  }
  if (title.length > 20) {
    return res.status(400).json({ success: false, message: "제목은 20자 이하로 입력해주세요." });
  }
  feedbackModel.updateTitle(feedbackId, userId, title, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류' });
    if (result.affectedRows === 0) {
      return res.status(403).json({ success: false, message: '토큰은 존재하나 사용자를 특정할 수 없습니다' });
    }
    res.status(200).json({ success: true, message: '피드백 제목이 성공적으로 수정되었습니다.' });
  });
};

exports.getFeedbackMemo = (req, res) => {
  const { userId, feedbackId } = req.params;
  if (!userId || !feedbackId) {
    return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다" });
  }
  feedbackModel.findMemoById(feedbackId, userId, (err, data) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류' });
    if (!data) return res.status(404).json({ success: false, message: 'url오류' });
    res.status(200).json({ success: true, message: '메모 조회 성공', data });
  });
};

exports.updateFeedbackMemo = (req, res) => {
  const { userId, feedbackId } = req.params;
  const { memo } = req.body;
  if (!userId || !feedbackId || memo === undefined) {
    return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다" });
  }
  if (memo.length > 50) {
    return res.status(400).json({ success: false, message: "메모는 50자 이하로 입력해주세요." });
  }
  feedbackModel.updateMemo(feedbackId, userId, memo, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류' });
    if (result.affectedRows === 0) {
      return res.status(403).json({ success: false, message: '토큰은 존재하나 사용자를 특정할 수 없습니다' });
    }
    res.status(200).json({ success: true, message: '피드백 메모가 성공적으로 수정되었습니다.' });
  });
};
