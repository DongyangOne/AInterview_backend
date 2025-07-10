const { loginCheck, addUser, userIdCheck } = require('../../models/signModel');


const signinProgress = (req, res) => {
    const userId = req.query.userId;
    const password = req.query.password;
    if (!userId) {
        console.log('아이디 미입력');
        return res.status(400).json({ success: false, message: '아이디 미입력' });
    }
    if (!password) {
        console.log('비밀번호 미입력');
        return res.status(400).json({ success: false, message: '비밀번호 미입력' });
    }
    loginCheck(userId, password, (err, result) => {
        if (err) {
            switch (err.code) { 
                case 'DB_ERROR':
                    return res.status(500).json({ success: false, message: err.message });
                case 'USER_NOT_FOUND':
                    return res.status(404).json({ success: false, message: err.message });
                case 'INVALID_PASSWORD':
                    return res.status(404).json({ success: false, message: err.message });
            }
        }

        
        req.session.user = {
            id: result[0].id,
            userId: result[0].user_id
        }
        console.log('세션 등록 완료');

        res.status(200).json({ success: true, data: result[0].user_id, message: '로그인 상태' });
    })
}


const signupProgress = (req, res) => {
    const userId = req.query.userId;
    const nickname = req.query.nickname;
    const password = req.query.password;
    const passwordCheck = req.query.passwordCheck;
    let appPush = req.query.appPush === 'Y' ? 'Y' : 'N';
    const idCheck = req.query.idCheck;
    
    const idRegex = /^[A-Za-z0-9]{3,15}$/;
    const nicknameRegex = /^[가-힣A-Za-z0-9]{2,8}$/;
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*]{8,16}$/;

    const errors = [];

    
    if (!userId) errors.push('아이디를 입력해주세요.');
    else if (!idRegex.test(userId)) errors.push('아이디는 3-15자의 영어, 숫자만 가능합니다.');

    if (!nickname) errors.push('닉네임을 입력해주세요.');
    else if (!nicknameRegex.test(nickname)) errors.push('닉네임은 2-8자의 한글, 영어, 숫자만 가능합니다. (부적절한 단어 사용 x)');

    if (!password) errors.push('비밀번호를 입력해주세요.');
    else if (!passwordRegex.test(password)) errors.push('비밀번호는 8-16자의 영어대소문자, 숫자, 특수문자(!,@,#,$,%,^,&,*)만 가능합니다.');

    if (!passwordCheck) errors.push('비밀번호 확인을 입력해주세요.');
    else if (password !== passwordCheck) errors.push('비밀번호가 일치하지 않습니다.');


    if (errors.length > 0) {
        console.log('입력 값 검증 실패 : ', errors);
        return res.status(400).json({ success: false, messages: errors });
    }


    
    if (!idCheck) {
        console.log('아이디 중복확인 필요');
        return res.status(400).json({ success: false, message: '아이디 중복확인을 해주세요.' });
    }

    userIdCheck(userId, (err, result) => {
        if (err) {
            switch (err.code) {
                case 'DB_ERROR':
                    return res.status(500).json({ success: false, message: err.message });
                case 'ID_DUPLICATE':
                    return res.status(400).json({ success: false, message: err.message });
            }
        }
        else {
            addUser(userId, nickname, password, appPush, (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, meesage: 'db오류' });
                }
                else if (result === true) {
                    return res.status(200).json({ success: true, message: '회원가입 완료' });
                }
            })

        }
    })
}



const userIdCheckProgress = (req, res) => {
    const userId = req.query.userId;
    const idRegex = /^[A-Za-z0-9]{3,15}$/;

    if(!userId){
        console.log('아이디 미입력');
        return res.status(400).json({success : false, message : '아이디를 입력해주세요.'});
    }

    if(!idRegex.test(userId)){
        console.log('아이디 조건 미충족');
        return res.status(400).json({success : false, message : '아이디는 3-15자의 영어, 숫자만 가능합니다.'});
    }
    userIdCheck(userId, (err, result)=>{
        if(err){
            switch (err.code) {
                case 'DB_ERROR':
                    return res.status(500).json({ success: false, message: err.message });
                case 'ID_DUPLICATE':
                    return res.status(400).json({ success: false, message: err.message });
            }
        }
        else{
            return res.status(200).json({success : true, message : '사용가능한 아이디'});
        }
    })
}




module.exports = {
    signinProgress,
    signupProgress,
    userIdCheckProgress
}