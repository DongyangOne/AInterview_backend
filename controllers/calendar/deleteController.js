const {getCalendarDelete} = require('../../models/datedeleteModel')

const getDelete = (req, res) => {
    const calendar_id = req.query.calendar_id;

    if (!calendar_id){
        return res.status(400).json({success: false, message: '아이디가 존재하지 않습니다.'});
   }

    getCalendarDelete(calendar_id, (err, result) => {
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

        res.status(200).json({success: true, message: '삭제되었습니다.'});
    }
})
};

module.exports = {getDelete}