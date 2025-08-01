const { pwCheck, updatePw, updateName, getAppPush, updateAppPush} = require('../../models/mypage/mypageModel');

//비밀번호 변경 함수
const pwChange = (req, res) => {
    const pw = req.body.password;
    const newPw = req.body.newPassword;
    const newPwCheck = req.body.newPasswordCheck;
    const loginUser = req.session.user;
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*]{8,16}$/;
    if (!loginUser) {
        console.log('로그인 필요');
        return res.status(401).json({ success: false, message: '로그인 필요' });
    }

    const loginUserId = req.session.user.id;
    const inputErrors = [];
    const errors = [];


    pwCheck(loginUserId, pw, (err, result) => {
        if (err) {
            switch (err.code) {
                case 'DB_ERROR':
                    return res.status(500).json({ success: false, message: err.message });
                case 'INVALID_PASSWORD':
                    if (!pw) return res.status(400).json({success : false, message : '미입력 정보가 존재합니다.', error : ['현재 비밀번호를 입력해주세요.']});
                    else {
                        return res.status(401).json({success : false, message :'형식에 맞지 않는 값이 존재합니다.', error : ['현재 비밀번호를 틀렸습니다. 다시 입력해주세요.']});
                    }
            }
        }



        if (!newPw) inputErrors.push('새 비밀번호를 입력해주세요.');
        else if (!passwordRegex.test(newPw)) errors.push('비밀번호는 8-16자의 영어대소문자, 숫자, 특수문자(!,@,#,$,%,^,&,*)만 가능합니다.');

        if (!newPwCheck) inputErrors.push('새 비밀번호 확인을 입력해주세요.');
        else if (newPw !== newPwCheck) errors.push('새 비밀번호확인이 일치하지 않습니다.');

        if(inputErrors.length > 0){
            console.log('입력 값 검증 실패 : ', inputErrors);
            return res.status(400).json({success : false, message : '미입력 정보가 존재합니다.', error : inputErrors});
        }
        if (errors.length > 0) {
            console.log('입력 값 검증 실패 : ', errors);
            return res.status(400).json({ success: false, message : '형식에 맞지 않는 값이 존재합니다.', error : errors });
        }




        updatePw(loginUserId, newPw, (err, result) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'db오류' });
            } else {
                return res.status(200).json({ success: true, message: '비밀번호 변경 완료' });
            }
        })
    })
}

//닉네임 변경 함수
const nicknameChange = (req, res)=>{
    const newName = req.body.newName;
    const loginUser = req.session.user;
    const nicknameRegex = /^[가-힣A-Za-z0-9]{2,8}$/;

    if(!loginUser){
        console.log('로그인 필요');
        return res.status(401).json({success : false, message : '로그인 필요'});
    }

    const loginUserId = req.session.user.id;

    if(!newName) return res.status(400).json({success : false, message : '미입력 정보가 존재합니다.', error : ['변경할 닉네임을 입력해주세요.']});
    else if(!nicknameRegex.test(newName)) return res.status(400).json({success : false, message : '닉네임은 2-8자의 한글, 영어, 숫자만 가능합니다. (부적절한 단어 사용 x)'});

    updateName(loginUserId, newName, (err, result)=>{
        if(err){
            return res.status(500).json({success : false, message : 'db오류'});
        }
        else{
            return res.status(200).json({success : true, message : '닉네임 변경 완료'});
        }
    })

}

//앱 푸시 설정 함수
const setAppPush = (req, res)=>{
    const loginUser = req.session.user;
    let updateInfo;
    if(!loginUser){
        console.log('로그인 필요');
        return res.status(401).json({success : false, message : '로그인 필요'});
    }

    const loginUserId = req.session.user.id;

    getAppPush(loginUserId, (err, result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({success : false, message : 'db오류'});
        }
        else{
            if(result[0].push_agreed === 'N') updateInfo = 'Y';
            else updateInfo = 'N';

            updateAppPush(loginUserId, updateInfo, (err, result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({success : false, message : 'db오류'});
                }
                else{
                    console.log('알람 수신 전환 완료');
                    getAppPush(loginUserId, (err, result)=>{
                        if(err) return res.status(500).json({success : false, message : 'db오류'});
                        else{
                            return res.status(200).json({success : true, message : '알람 수신 정보 전환 완료', status : result[0].push_agreed});
                        }
                    })
                }
            })
        }
    })
    
}

//비밀번호 일치 확인용 함수
const passwordCheck = (req, res)=>{
    const password = req.body.password;
    const loginUser = req.session.user;

    if(!loginUser){
        console.log('로그인 필요');
        return res.status(401).json({success : false, message : '로그인 필요'});
    }

    const loginUserId = req.session.user.id;

    if(!password){
        return res.status(400).json({success : false, message : '미입력 정보가 존재합니다.', error : ['비밀번호를 입력해주세요.']});
    }
    else{
        pwCheck(loginUserId, password, (err, result)=>{
            if(err){
                switch(err.code){
                    case 'DB_ERROR' :
                        console.log(err.error);
                        return res.status(500).json({success : false, message : err.message});
                    case 'INVALID_PASSWORD' :
                        return res.status(401).json({success : false, message : '형식에 맞지 않는 값이 존재합니다.', error : ['비밀번호를 틀렸습니다. 다시 입력해주세요.']});
                }
            }
            else{
                return res.status(200).json({success : true, message : '올바른 비밀번호'});
            }
        })
    }
}

module.exports = {
    pwChange,
    nicknameChange,
    setAppPush,
    passwordCheck
}