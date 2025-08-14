const { getUserNotices, markNoticeRead } = require('../../models/mainpage/noticeModel');
const now = new Date().toISOString()

const getNotices = (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        console.warn(`[${now}] 알림 조회 | 400 | userId가 필요합니다.`);
        return res.status(400).json({
            success: false,
            message: 'userId가 필요합니다.'
        });
    }

    getUserNotices(userId, (err, notices) => {
        if (err) {
            console.error(`[${now}] 알림 조회 | 500 | 알림 조회 실패`, err);
            return res.status(500).json({
                success: false,
                message: '알림 조회 중 오류 발생'
            });
        }

        console.info(`[${now}] 알림 조회 | 200 | 알림 조회 성공`);
        res.status(200).json({
            success: true,
            data: notices
        });
    });
};

const readNotice = (req, res) => {
    const userId = req.params.userId;
    const noticeId = req.params.noticeId;

    if (!userId) {
        console.warn(`[${now}] 알림 읽음 처리 | 400 | userId가 필요합니다.`);
        return res.status(400).json({ success: false, message: 'userId가 필요합니다.' });
    }

    markNoticeRead(userId, noticeId, (err, result) => {
        if (err) {
            console.error(`[${now}] 알림 읽음 처리 | 500 | 알림 읽음 처리 실패`, err);
            return res.status(500).json({ success: false, message: '알림 읽음 처리 중 오류 발생' });
        }

        console.info(`[${now}] 알림 읽음 처리 | 200 | 알림 읽음 처리 성공`);
        res.status(200).json({
            success: true,
            message: noticeId ? noticeId + ' 알림이 읽음 처리되었습니다.' : userId + '의 모든 알림이 읽음 처리되었습니다.'
        });
    });
};

module.exports = {
    getNotices,
    readNotice
};