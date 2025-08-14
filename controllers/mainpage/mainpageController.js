//backend-2
const { TwTODO, recentFeedback, todayQuestion, updateUserPushToken, insertNotice } = 
require('../../models/mainpage/mainpageModel');

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

const now = new Date();

//backend-5/6
const updatePushToken = (req, res) => {
    const userId = req.body.userId;

    if (!userId) {
        console.warn(`[${now}] ${req.method} ${req.originalUrl} | 400 | userId가 필요합니다.`);
        return res.status(400).json({ success: false, message: 'userId가 필요합니다.' });
    }
    
    const pushToken = req.body.pushToken;

    if (!pushToken) {
        console.warn(`[${now}] ${req.method} ${req.originalUrl} | 400 | 푸시 토큰이 전달되지 않았습니다.`);
        return res.status(400).json({ success: false, message: '푸시 토큰이 전달되지 않았습니다.' });
    }

    updateUserPushToken(userId, pushToken, (err, result) => {
        if (err) {
            console.error(`[${now}] ${req.method} ${req.originalUrl} | 500 | 푸시 토큰 저장 실패`, err);
            return res.status(500).json({ success: false, message: '푸시 토큰 저장 중 오류 발생' });
        }

        res.status(200).json({ success: true, message: '푸시 토큰이 성공적으로 저장되었습니다.' });
    });
};

const sendNotice = (req, res) => {
    const userId = req.body.userId;

    if (!userId) {
        console.warn(`[${now}] ${req.method} ${req.originalUrl} | 400 | userId가 필요합니다.`);
        return res.status(400).json({ success: false, message: 'userId가 필요합니다.' });
    }

    const { title, content } = req.body;

    if (!title || !content) {
        console.warn(`[${now}] ${req.method} ${req.originalUrl} | 400 | title, content가 필요합니다.`);
        return res.status(400).json({ success: false, message: 'title, content가 필요합니다.' });
    }

    insertNotice(userId, title, content, (err, result) => {
        if (err) {
            console.error(`[${now}] ${req.method} ${req.originalUrl} | 500 | 알림 전송 실패`, err);
            return res.status(500).json({ success: false, message: '알림 저장 중 오류 발생' });
        }

        res.status(200).json({ success: true, message: '알림이 전송되었습니다.', noticeId: result.insertId });
    });
};

module.exports = { 
    Twcalendar, 
    getRecentFeedback, 
    getTodayQuestion,
    updatePushToken,
    sendNotice };
    