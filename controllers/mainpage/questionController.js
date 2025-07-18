const { todayQuestion } = require('../../models/questionModel');

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

module.exports = { getTodayQuestion };
