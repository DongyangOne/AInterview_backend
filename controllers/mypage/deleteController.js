const {getFeedCount, getFeedContent, deleteUser} = require('../../models/deleteModel');

//현재 사용자의 피드백 정보 조회 함수
const feedInfoProgress = (req, res) =>{
    const loginUser = req.session.user;
    let feedCount = 0; 
    if(!loginUser){
        console.log('로그인 필요');
        return res.status(401).json({success : false, message : '로그인 필요'});
    }
    const loginUserId = req.session.user.id;

    getFeedCount(loginUserId, (err, result)=>{
        if(err){
            return res.status(500).json({success : false, message : '피드백 정보 조회 중 오류'});
        }
        else{
            console.log('총 개수 조회 완료');
            feedCount = result[0].feedback_count;
            if(feedCount === 0){
                return res.status(200).json({success : true, count : 0, list :[]});
            }
            getFeedContent(loginUserId, (err, results)=>{
                if(err){
                    return res.status(500).json({success : false, message : 'db오류'});
                }
                else{
                    return res.status(200).json({success : true, count : feedCount, list : results});
                }
            })
        }
    })   
}

//탈퇴 함수
const deleteUserProgress = (req, res)=>{
    const loginUser = req.session.user;
    
    if(!loginUser){
        console.log('로그인 필요');
        return res.status(401).json({success : false, message : '로그인 필요'});
    }

    const loginUserId = req.session.user.id;

    deleteUser(loginUserId, (err, result)=>{
        if(err){
            return res.status(500).json({success : false, message : '탈퇴 중 오류'});
        }
        else{
            return res.status(200).json({success : true, message : '탈퇴 완료'});
        }
    })

}


module.exports = {
    feedInfoProgress,
    deleteUserProgress
}