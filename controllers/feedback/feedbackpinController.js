const {pinFeedback, unpinFeedback}  = require('../../models/feedback/feedbackModel');


//  피드백 상단 고정
const getPin= (req, res) => {
  const { feedback_id } = req.params; 
  
  pinFeedback(feedback_id, (err, result)=> {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ success: true, message: '피드백 상단 고정 완료', data: result });
  });
};
    

//  피드백 상단 고정 해제
const getUnpin = (req, res) => {
  const { feedback_id } = req.params; 

   unpinFeedback(feedback_id, (err, result)=> {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: '피드백 상단 고정 해제 완료', data: result });
  });
};

module.exports = {
  getPin, getUnpin
}