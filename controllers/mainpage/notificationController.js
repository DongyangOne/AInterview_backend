const userModel = require('../../models/userModel');
const { sendPush } = require('../../utils/expoPushUtil');
const { insertNotice } = require('../../models/noticeModel');

// 푸시 토큰 저장 API 핸들러
const savePushToken = async (req, res) => {
    const { user_id, push_token } = req.body;

    try {
        const updated = await userModel.updatePushToken(user_id, push_token);
        if (updated) {
            return res.status(200).json({ success: true, message: '푸시 토큰 저장 성공' });
        } else {
            return res.status(404).json({ success: false, message: '사용자 없음' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: '서버 에러', error: error.message });
    }
};

// 알림 전송 및 저장 API 핸들러
const sendNotification = async (req, res) => {
    const { user_id, title, content } = req.body;

    try {
        const user = await userModel.getUserByUserId(user_id);
        if (!user) {
            return res.status(404).json({ success: false, message: '사용자 없음' });
        }

        const notificationId = await insertNotice(user.id, title, content);

        let pushResult = '푸시 동의 안함 또는 토큰 없음';

        // 사용자가 푸시 동의(Y) 상태이고 토큰이 있으면 푸시 전송
        if (user.push_agreed === 'Y' && user.push_token) {
            const result = await sendPush(user.push_token, title, content);
            pushResult = result.success ? '푸시 전송 성공' : `푸시 실패: ${result.error}`;
        }

        return res.status(200).json({
        success: true,
        message: '알림 처리 완료',
        notification_id: notificationId,
        push_status: pushResult
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: '서버 에러', error: error.message });
    }
};

module.exports = { 
    savePushToken,
    sendNotification
};