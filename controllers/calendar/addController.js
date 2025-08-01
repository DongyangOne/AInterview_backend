//일정 추가

const {createDate} = require('../../models/calendar/calendarModel')

const addDate = (req, res) => {
    const userId = req.query.userId;
    const title = req.query.title;
    const time = req.query.time;
    const importance = req.query.importance;
    const memo = req.query.memo;

    const importanceText = ['S', 'I', 'N'];
    const importanceArr ={
        S: '매우 중요',
        I: '중요',
        N: 'X'
    };

    if (!userId || !time || !title || !importance){
        return res.status(400).json({success: false, message: '미입력 정보가 존재합니다.'});
    }

    if (title.length > 8){
        return res.status(400).json({success: false, message: '8자 미만으로 입력해 주십시오.'})
    }

    if(importance !== 'S' && importance !== 'I' && importance !== 'N'){
        return res.status(400).json({success: false, message: '중요도에는 s, i, n만 입력 가능합니다.'})
    }


createDate(userId, title, time, importance, memo, (err, result) => {
    if (err){
        return res.status(500).json({success:false, message: '오류 발생', details: err});
    }

    const importanceResult = importanceArr[importance]

        res.status(200).json({success: true, data: result, importanceResult});
})
};

module.exports = {addDate}
