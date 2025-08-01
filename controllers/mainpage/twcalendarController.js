const { TwTODO } = require('../../models/twcalendarModel');


const Twcalendar = (req, res) => {
    const userId = req.query.userId;
<<<<<<< HEAD
=======

>>>>>>> 9c2e91bb333fc0a122ae57eabf324d215d3307f5

    if (!userId) {
        return res.status(401).json({ success: false, message: 'user_id가 필요합니다.' });
    }

    // 콜백 기반 응답
    TwTODO(userId, (err, result) => {
        if (err) {
            console.error('DB 오류:', err);
            return res.status(502).json({ success: false, message: '서버 오류', error: err });
        }

        const today = new Date();
        let todayInfo = today.getDate();

        return res.status(200).json({ success: true, data: result, today: todayInfo });
    });
};

module.exports={Twcalendar}