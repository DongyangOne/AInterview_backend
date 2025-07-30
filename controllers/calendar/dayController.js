//일정 상세 조회
//3000/calendar/day?userId, year, month,day 입력

const {getUserDay} = require('../../models/dayModel')

const getSearchDay = (req, res) => {
    const userId = req.query.userId;
    const year = Number(req.query.year);
    const month = Number(req.query.month);
    const day = Number(req.query.day);

    if (!userId || !year || !month || !day){
        return res.status(400).json({success: false, message: '미입력 정보가 존재합니다.'});
    }

getUserDay(userId, year, month, day, (err, result) => {
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

    if (result.length === 0){
        res.status(200).json({success: true, message:'일정이 없습니다.'});
    }
    else {
        res.status(200).json({success: true, data: result})
    }
}  
})
};

module.exports = {getSearchDay} //CONTROLLER