const feedbackModel = require('../../models/deletefeedbackModel');

exports.deleteFeedback = (req, res) => {
  const { userId, feedbackId } = req.params;


  feedbackModel.deleteById({ feedbackId, userId }, (err, result) => {
    
    if (err) {
      return res.status(500).json({
        success: false,
        message: '서버 오류',
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: '해당 피드백을 찾을 수 없습니다.' 
      });
    }

    res.status(200).json({
      success: true,
      message: '피드백이 성공적으로 삭제되었습니다.'
    });
  });
};