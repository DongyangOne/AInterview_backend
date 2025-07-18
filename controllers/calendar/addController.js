//일정 추가

const {getCalendarAdd} = require('../../models/dateaddModel')

const getAdd = (req, res) => {
    const userId = req.query.userId;
    const year = Number(req.query.year);
    const title = req.query.title;
    const time = req.query.time;
    const importance = req.query.importance;
    const memo = req.query.memo;

    if (!userId){
        return res.status(400).json({success: false, message: '아이디가 존재하지 않습니다.'});
    }

     if (!year){
        return res.status(400).json({success: false, message: '년도가 입력되지 않았습니다.'});
    }

    if (!title){
        return res.status(400).json({success: false, message: '이름이 입력되지 않았습니다.'});
    }

    if (!time){
        return res.status(400).json({success: false, message: '시간이 입력되지 않았습니다.'});
    }

    if (importance === null){
        return res.status(400).json({success: false, message: '중요도를 선택해 주십시오.'});
    }

    if (title.length > 8){
        return res.status(400).json({success: false, message: '8자 미만으로 입력해 주십시오.'})
    }

getCalendarAdd(userId, year, title, time, importance, memo, (err, result) => {
    if (err){
        return res.status(500).json({success:false, message: '오류 발생', details: err});
    }

        res.status(200).json({success: true, data: result});
})
};

module.exports = {getAdd}
