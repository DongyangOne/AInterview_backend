const {getCalendarUpdate} = require('../../models/dateupdateModel')

const getUpdate = (req, res) => {
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

    if (!userId || !title || !time || !importance){
        return res.status(400).json({success: false, message: '아이디가 존재하지 않습니다.'});
    }

    if (title.length > 8){
        return res.status(400).json({success: false, message: '8자 미만으로 입력해 주십시오.'})
    }

    if(importance !== 'S' && importance !== 'I' && importance !== 'N'){
        return res.status(400).json({success: false, message: '중요도에는 s, i, n만 입력 가능합니다.'})
    }


getCalendarUpdate(userId, title, time, importance, memo, (err, result) => {
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

    const importanceResult = importanceArr[importance]

        res.status(200).json({success: true, data: result, importanceResult});
    }
})
};

module.exports = {getUpdate}