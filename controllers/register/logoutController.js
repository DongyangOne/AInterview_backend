const logoutProgress = (req, res)=>{ //로그아웃 함수
    //세션 삭제
    req.session.destroy((err)=>{
        if(err){
            console.log('세션 삭제 중 오류 : ',err);
            return res.status(500).json({success : false, message : '로그아웃 중 오류'});
        }
        res.clearCookie('connect.sid'); //세션 쿠키 삭제
        console.log('로그아웃 완료');
        return res.status(200).json({success : true, message : '로그아웃 성공'});
    });
}

module.exports = {
    logoutProgress
};