//일정 상세 조회
//3000/calendar/day?userId, year, month,day 입력

const {getUserDay} = require('../../models/dayModel')

const getDay = (req, res) => {
    const userId = req.query.userId;
    const year = Number(req.query.year);
    const month = Number(req.query.month);
    const day = Number(req.query.day);

    if (!userId){
        return res.status(400).json({success: false, message: '아이디가 존재하지 않습니다.'});
    }

    if (!year){
        return res.status(400).json({success: false, message: '년도가 입력되지 않았습니다.'});
    }

    if (!month){
        return res.status(400).json({success: false, message: '월이 입력되지 않았습니다.'});
    }

    if (!day){
        return res.status(400).json({success: false, message: '일이 입력되지 않았습니다.'});
    }

getUserDay(userId, year, month, day, (err, result) => {
    if (err){
        return res.status(500).json({success:false, message: '오류 발생', details: err});
    }

    if (result.length === 0){
        res.status(200).json({success: true, message:'일정이 없습니다.'});
    }
    else {
        res.status(200).json({success: true, data: result})
    }
    
})
};

module.exports = {getDay} //CONTROLLER