//backend-2
const { TwTODO, recentFeedback, todayQuestion, getUserNotices, updateUserPushToken, insertNotice, markNoticeRead } = require('../../models/mainpage/mainpageModel');

const Twcalendar = (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'user_id가 필요합니다.' });
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

//backend-5/6
const getNotices = (req, res) => {
    // 클라이언트에서 userId를 경로 파라미터로 받는 경우
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'userId가 필요합니다.' });
    }

    // 세션에서 userId를 가져오는 경우
    // const user = req.session.user;

    // if (!user || !user.id) {
    //     return res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
    // }

    // const userId = user.id;

    getUserNotices(userId, (err, notices) => {
        if (err) {
            console.error('알림 조회 실패:', err);
            return res.status(500).json({ success: false, message: '알림 조회 중 오류 발생' });
        }

        res.status(200).json({ success: true, data: notices });
    });
};

const updatePushToken = (req, res) => {
    // 세션에서 userId를 가져오는 경우
    // const user = req.session.user;

    // if (!user || !user.id) {
    //     return res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
    // }

    // const userId = user.id;

    // 클라이언트에서 userId을 요청 본문으로 받는 경우
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'userId가 필요합니다.' });
    }
    
    const pushToken = req.body.pushToken;

    if (!pushToken) {
        return res.status(400).json({ success: false, message: '푸시 토큰이 전달되지 않았습니다.' });
    }

    updateUserPushToken(userId, pushToken, (err, result) => {
        if (err) {
            console.error('푸시 토큰 저장 실패:', err);
            return res.status(500).json({ success: false, message: '푸시 토큰 저장 중 오류 발생' });
        }

        res.status(200).json({ success: true, message: '푸시 토큰이 성공적으로 저장되었습니다.' });
    });
};

const readNotice = (req, res) => {
    // 세션에서 userId를 가져오는 경우
    // const user = req.session.user;

    // if (!user || !user.id) {
    //     return res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
    // }

    // const userId = user.id;

    // 클라이언트에서 userId을 요청 본문으로 받는 경우
    const userId = req.params.userId;
    const noticeId = req.params.noticeId;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'userId가 필요합니다.' });
    }

    markNoticeRead(userId, noticeId, (err, result) => {
        if (err) {
            console.error('알림 읽음 처리 실패:', err);
            return res.status(500).json({ success: false, message: '알림 읽음 처리 중 오류 발생' });
        }

        res.status(200).json({
            success: true,
            message: noticeId ? noticeId + ' 알림이 읽음 처리되었습니다.' : userId + '의 모든 알림이 읽음 처리되었습니다.'
        });
    });
};

const sendNotice = (req, res) => {
    // 세션에서 userId를 가져오는 경우
    // const user = req.session.user;

    // if (!user || !user.id) {
    //     return res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
    // }

    // const userId = user.id;

    // 클라이언트에서 userId을 요청 본문으로 받는 경우
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'userId가 필요합니다.' });
    }

    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ success: false, message: 'title, content가 필요합니다.' });
    }

    insertNotice(userId, title, content, (err, result) => {
        if (err) {
            console.error('알림 전송 실패:', err);
            return res.status(500).json({ success: false, message: '알림 저장 중 오류 발생' });
        }

        res.status(200).json({ success: true, message: '알림이 전송되었습니다.', noticeId: result.insertId });
    });
};

module.exports = { 
    Twcalendar, 
    getRecentFeedback, 
    getTodayQuestion,
    getNotices,
    updatePushToken,
    readNotice,
    sendNotice };

