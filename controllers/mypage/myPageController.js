const {myInfo} = require('../../models/myPageModel');

const myInfoProgress = (req, res) =>{
    const loginUser = req.session.user;

    //세션 존재 유무 확인
    if(!loginUser){
        console.log('로그인 필요');
        return res.status(401).json({success : false, message : '로그인 필요'});
    }

    const loginUserId = req.session.user.id;

    myInfo(loginUserId, (err, result)=>{
        if(err){
            return res.status(500).json({success : false, message : 'db오류'});
        }else{
            console.log('사용자 정보 불러오기 성공');
            return res.status(200).json({success : true, message : '사용자 정보 불러오기 성공', userId : result[0].user_id, nickname : result[0].nickname, profile : result[0].image_url});
        }
    })
}

module.exports = {
    myInfoProgress
}