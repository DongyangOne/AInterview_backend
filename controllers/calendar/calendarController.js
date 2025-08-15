const {getUserMonth, getUserDay, createDate, getCalendarUpdate, getCalendarDelete} = require('../../models/calendar/calendarModel')

//backend-15
const getSearchmonth = (req, res) => {
    const userId = req.query.userId;
    const year = Number(req.query.year);
    const month = Number(req.query.month);

    if (!userId || !month || !year ){
        return res.status(400).json({success: false, message: '미입력 정보가 존재합니다.'});
    }

getUserMonth(userId, year, month, (err, result) => {
    if (err){
        return res.status(500).json({success:false, message: '오류 발생', details: err});
    }

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();
    let todayInfo = null;

    if(todayYear === year && todayMonth === month){
        todayInfo = todayDate;
    }

    res.status(200).json({success: true, today: todayInfo, data: result})
})
};

//backend-16
const getSearchDay = (req, res) => {
    const userId = req.query.userId;
    const year = Number(req.query.year);
    const month = Number(req.query.month);
    const day = Number(req.query.day);

    const today = new Date();
    const datetime = today.toLocaleString();

    if (!userId || !year || !month || !day){
        console.log(datetime, `캘린더 day 조회 400`);
        return res.status(400).json({success: false, message: '미입력 정보가 존재합니다.'});
    }

getUserDay(userId, year, month, day, (err, result) => {
    if (err){
        console.log(datetime, `캘린더 day 조회 500`);
        return res.status(500).json({success:false, message: '오류 발생', details: err});
    }

    if (result.length === 0){
        console.log(datetime, `캘린더 day 조회 200`);
        res.status(200).json({success: true, message:'일정이 없습니다.'});
    }
    else {
        console.log(datetime, `캘린더 day 조회 200`);
        res.status(200).json({success: true, data: result})
}  
})
};

//backend-17
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

//backend-18
const getUpdate = (req, res) => {
    const userId = req.query.userId;
    const calendar_id = req.query.calendar_id;
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

    if (title.length > 8){
        return res.status(400).json({success: false, message: '8자 미만으로 입력해 주십시오.'})
    }

    if(importance !== 'S' && importance !== 'I' && importance !== 'N'){
        return res.status(400).json({success: false, message: '중요도에는 s, i, n만 입력 가능합니다.'})
    }


getCalendarUpdate(userId, calendar_id, title, time, importance, memo, (err, result) => {
    if (err){
        return res.status(500).json({success:false, message: '오류 발생', details: err});
    }

    const importanceResult = importanceArr[importance]

        res.status(200).json({success: true, data: result, importanceResult});
})
};

//backend-19
const getDelete = (req, res) => {
    const calendar_id = req.query.calendar_id;

    if (!calendar_id){
        return res.status(400).json({success: false, message: '미입력 정보가 존재합니다.'});
   }

    getCalendarDelete(calendar_id, (err, result) => {
     if (err){
        return res.status(500).json({success:false, message: '오류 발생', details: err});
    }

        res.status(200).json({success: true, message: '삭제되었습니다.'});
})
};

module.exports = {
    getSearchmonth,
    getSearchDay,
    addDate,
    getUpdate,
    getDelete
}