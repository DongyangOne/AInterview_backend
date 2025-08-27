//backend-2
const { TwTODO, recentFeedback, todayQuestion } = require('../../models/mainpage/mainpageModel');


const Twcalendar = (req, res) => {
    const userId = req.query.userId;
const date = new Date();
const koreaTime = date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    if (!userId) {

console.log(`[${koreaTime}] twcalendar 사용 400 응답`);
        return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다.' });

    }

    // 콜백 기반 응답
    TwTODO(userId, (err, result) => {
        if (err) {
            console.error('[TwTODO]오류:', err);
            console.log(`[${koreaTime}] twcalendar 사용 500 응답`);
            console.error('DB 오류:', err);
            
            return res.status(500).json({ success: false, message: '서버 오류', error: err });
        }

        const today = new Date();
        let todayInfo = today.getDate();
console.log(`[${koreaTime}] twcalendar 사용 200 응답`);
        return res.status(200).json({ success: true, data: result, today: todayInfo });
    });
}

//backend-3
const getRecentFeedback = (req, res) => {
    const userId = req.query.userId;
    const date = new Date();
const koreaTime = date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });


    
    if (!userId) {
        console.log(`[${koreaTime}]getrecentFeedBack 400응답`);
        return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다.' });
    }

    recentFeedback(userId, (err, result) => {
        if (err) {
            console.log(`[${koreaTime}]getrecentFeedBack 500응답`);
            console.error('[recentFeedback] sql오류:', err);
            
            return res.status(500).json({ success: false, message: '피드백 조회 실패', error: err });
        }
console.log(`[${koreaTime}]getrecentFeedBack 200응답`);
        return res.status(200).json({ success: true, data: result });
    });
};

//backend-4
// 오늘의 질문 조회
const getTodayQuestion = (req, res) => {
    const date = new Date();
const koreaTime = date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

 
    todayQuestion( (err, result) => {
        if (err) {
            console.error('todayQuestion 오류:', err);
            console.log(`[${koreaTime}] getTodayQuestion 500응답`);
            return res.status(500).json({ success: false, message: '질문 조회 실패', error: err });
        }

        console.log(`[${koreaTime}] getTodayQuestion 200응답`);
        return res.status(200).json({ success: true, data: result });
    });
};

module.exports = { 
    Twcalendar, 
    getRecentFeedback, 
    getTodayQuestion
};
    