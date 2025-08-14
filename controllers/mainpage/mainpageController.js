//backend-2
const { TwTODO, recentFeedback, todayQuestion } = require('../../models/mainpage/mainpageModel');

const Twcalendar = (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다.' });
    }

    // 콜백 기반 응답
    TwTODO(userId, (err, result) => {
        if (err) {
            console.error('DB 오류:', err);
            return res.status(500).json({ success: false, message: '서버 오류', error: err });
        }

        const today = new Date();
        let todayInfo = today.getDate();

        return res.status(200).json({ success: true, data: result, today: todayInfo });
    });
}

//backend-3
const getRecentFeedback = (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다.' });
    }

    recentFeedback(userId, (err, result) => {
        if (err) {
            console.error('recentFeedback 오류:', err);
            return res.status(500).json({ success: false, message: '피드백 조회 실패', error: err });
        }

        return res.status(200).json({ success: true, data: result });
    });
};

//backend-4
// 오늘의 질문 조회
const getTodayQuestion = (req, res) => {

    todayQuestion( (err, result) => {
        if (err) {
            console.error('todayQuestion 오류:', err);
            return res.status(500).json({ success: false, message: '질문 조회 실패', error: err });
        }

        return res.status(200).json({ success: true, data: result });
    });
};

module.exports = { 
    Twcalendar, 
    getRecentFeedback, 
    getTodayQuestion
};
    