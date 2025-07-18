const { getUserNotices } = require('../../models/noticeModel');

const getNotices = (req, res) => {
    const userId = req.query.userId; // 쿼리 파라미터 (?userId=)로 전달해야 함

    if (!userId) {
        return res.status(400).json({ success: false, message: 'user_id가 필요합니다.' });
    }

    getUserNotices(userId, (err, notices) => {
        if (err) {
            console.error('알림 조회 실패:', err);
            return res.status(500).json({ success: false, message: '알림 조회 중 오류 발생' });
        }

        res.status(200).json({ success: true, data: notices });
    });
};

module.exports = { getNotices };