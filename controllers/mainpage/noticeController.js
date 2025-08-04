const { getUserNotices, markNoticeRead } = require('../../models/noticeModel');

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

module.exports = {
    getNotices,
    readNotice,
};