//해당 달 조회 기능
// 3000/calendar/month?userId, year, month 입력

const {getUserMonth} = require('../../models/monthModel')

const getSearchmonth = (req, res) => {
    const userId = req.query.userId;
    const year = Number(req.query.year);
    const month = Number(req.query.month);

    if (!userId || !month || !year ){
        return res.status(400).json({success: false, message: '미입력 정보가 존재합니다.'});
    }

getUserMonth(userId, year, month, (err, result) => {
    if (err){
        switch (err.code){
            case 'DB_ERROR' :
                return res.status(500).json({success:false, message: '서버 오류 발생', details: err});
            case 'INVALID_URL' :
                return res.status(404).json({success:false, message:'url 입력 에러', details: err});
             case 'UNAUTHORIZED':
                return res.status(401).json({ success: false, message: '인증 정보 없음', details: err });
            case 'FORBIDDEN':
                return res.status(403).json({ success: false, message: '접근 권한 없음', details: err });
        }
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

module.exports = {getSearchmonth}
