//해당 달 조회 기능
// 3000/calendar/month?userId, year, month 입력

const {getUserMonth} = require('../../models/monthModel')

const getMonth = (req, res) => {
    const userId = req.query.userId;
    const year = Number(req.query.year);
    const month = Number(req.query.month);

    if (!userId){
        return res.status(400).json({success: false, message: '아이디가 존재하지 않습니다.'});
    }

    if (!year){
        return res.status(400).json({success: false, message: '년도가 입력되지 않았습니다.'});
    }

    if (!month){
        return res.status(400).json({success: false, message: '월이 입력되지 않았습니다.'});
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

module.exports = {getMonth}
