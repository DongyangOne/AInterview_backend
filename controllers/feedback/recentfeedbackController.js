
const { recentFeedback } = require('../../models/recentfeedbackModel');


const getRecentFeedback = (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'user_id가 필요합니다.' });
    }

    recentFeedback(userId, (err, result) => {
        if (err) {
            console.error('recentFeedback 오류:', err);
            return res.status(500).json({ success: false, message: '피드백 조회 실패', error: err });
        }

        return res.status(200).json({ success: true, data: result });
    });
};

module.exports = { getRecentFeedback };


