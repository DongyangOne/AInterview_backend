const feedbackModel = require('../../models/feedbackModel');

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};

exports.updateFeedbackMemo = (req, res) => {
  const { userId, feedbackId } = req.params;
  const { memo } = req.body;

  if (memo === undefined) {
    return res.status(400).json({ success: false, message: '수정할 메모를 입력해주세요.' });
  }

 // 메모 수정 실행
  feedbackModel.updateMemo({ feedbackId, memo, userId }, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: '피드백을 찾을 수 없거나 수정 권한이 없습니다.' });
    }

    // 수정 후 다시 가져오기
    feedbackModel.findById({ feedbackId, userId }, (err2, updated) => {
      if (err2) {
        return res.status(500).json({ success: false, message: '수정 후 데이터 조회 실패', error: err2.message });
      }

      res.status(200).json({
        success: true,
        message: '피드백 메모가 성공적으로 수정되었습니다.',
        data: {
          memo: updated.memo,
          created_at: formatDate(updated.created_at)
        }
      });
    });
  });
};


