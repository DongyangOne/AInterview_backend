const logoutProgress = (req, res)=>{ 
    
    req.session.destroy((err)=>{
        if(err){
            console.log('세션 삭제 중 오류 : ',err);
            return res.status(500).json({success : false, message : '로그아웃 중 오류'});
        }
        res.clearCookie('connect.sid'); 
        console.log('로그아웃 완료');
        return res.status(200).json({success : true, message : '로그아웃 성공'});
    });
}

module.exports = {
    logoutProgress
};