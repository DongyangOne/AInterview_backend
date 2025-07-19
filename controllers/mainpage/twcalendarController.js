const { TwTODO } = require('../../models/twcalendarModel');


const Twcalendar = (req, res) => {
    const userId = req.query.user_id;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'user_id가 필요합니다.' });
    }

    // 콜백 기반 응답
    TwTODO(userId, (err, result) => {
        if (err) {
            console.error('DB 오류:', err);
            return res.status(500).json({ success: false, message: '서버 오류', error: err });
        }

        return res.status(200).json({ success: true, data: result });
    });
};

module.exports={Twcalendar}
