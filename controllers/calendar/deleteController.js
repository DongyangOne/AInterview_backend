const {getCalendarDelete} = require('../../models/datedeleteModel')

const getDelete = (req, res) => {
    const calendar_id = req.query.calendar_id;

    if (!calendar_id){
        return res.status(400).json({success: false, message: '아이디가 존재하지 않습니다.'});
   }

    getCalendarDelete(calendar_id, (err, result) => {
    if (err){
        return res.status(500).json({success:false, message: '오류 발생', details: err});
    }

        res.status(200).json({success: true, message: '삭제되었습니다.'});
})
};

module.exports = {getDelete}