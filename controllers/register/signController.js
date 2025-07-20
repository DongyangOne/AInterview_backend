const { loginCheck, addUser, userIdCheck } = require('../../models/signModel');

//로그인 함수
const signinProgress = (req, res) => {
    const loginUserId = req.body.loginUserId;
    const password = req.body.password;
    if (!loginUserId) {
        console.log('아이디 미입력');
        return res.status(400).json({ success: false, message: '아이디 미입력' });
    }
    if (!password) {
        console.log('비밀번호 미입력');
        return res.status(400).json({ success: false, message: '비밀번호 미입력' });
    }
    loginCheck(loginUserId, password, (err, result) => {
        if (err) {
            switch (err.code) { //각종 에러 처리
                case 'DB_ERROR':
                    return res.status(500).json({ success: false, message: err.message });
                case 'USER_NOT_FOUND':
                    return res.status(404).json({ success: false, message: err.message });
                case 'INVALID_PASSWORD':
                    return res.status(404).json({ success: false, message: err.message });
            }
        }

        //세션 등록
        req.session.user = {
            id: result[0].id,
            userId: result[0].user_id
        }
        console.log('세션 등록 완료');

        res.status(200).json({ success: true, data: result[0].user_id, message: '로그인 상태' });
    })
}

//회원가입 함수
const signupProgress = (req, res) => {
    const loginUserId = req.body.loginUserId;
    const nickname = req.body.nickname;
    const password = req.body.password;
    const passwordCheck = req.body.passwordCheck;
    let service = req.body.service === 'Y' ? 'Y' : 'N'; //서비스 동의 추가
    let appPush = req.body.appPush === 'Y' ? 'Y' : 'N';
    const idCheck = req.body.idCheck;
    //사용자 아이디 중복확인 여부 : 해당 여부는 프론트에서 중복확인 검사를 햇을 경우에 true로 넘겨줘야 함. 기본 값 fasle로 안햇을 경우는 false로 넘기기
    //->주의할 점 : 사용자가 중복확인 후 다른 아이디로 바꿔서 썼을 때는 다시 false로 돌려줘야 된다.
    //아래는 정규표현식 정의(아이디 조건 등)
    const idRegex = /^[A-Za-z0-9]{3,15}$/;
    const nicknameRegex = /^[가-힣A-Za-z0-9]{2,8}$/;
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*]{8,16}$/;

    const errors = [];

    //조건충족 검사
    if (!loginUserId) errors.push('아이디를 입력해주세요.');
    else if (!idRegex.test(loginUserId)) errors.push('아이디는 3-15자의 영어, 숫자만 가능합니다.');

    if (!nickname) errors.push('닉네임을 입력해주세요.');
    else if (!nicknameRegex.test(nickname)) errors.push('닉네임은 2-8자의 한글, 영어, 숫자만 가능합니다. (부적절한 단어 사용 x)');

    if (!password) errors.push('비밀번호를 입력해주세요.');
    else if (!passwordRegex.test(password)) errors.push('비밀번호는 8-16자의 영어대소문자, 숫자, 특수문자(!,@,#,$,%,^,&,*)만 가능합니다.');

    if (!passwordCheck) errors.push('비밀번호 확인을 입력해주세요.');
    else if (password !== passwordCheck) errors.push('비밀번호가 일치하지 않습니다.');

    if(service === 'N'){
        errors.push('서비스 이용약관에 동의해 주세요.');
    }


    if (errors.length > 0) {
        console.log('입력 값 검증 실패 : ', errors);
        return res.status(400).json({ success: false, messages: errors });
    }


    //아이디 중복확인 여부 검사
    if (!idCheck) {
        console.log('아이디 중복확인 필요');
        return res.status(400).json({ success: false, message: '아이디 중복확인을 해주세요.' });
    }

    userIdCheck(loginUserId, (err, result) => {
        if (err) {
            switch (err.code) {
                case 'DB_ERROR':
                    return res.status(500).json({ success: false, message: err.message });
                case 'ID_DUPLICATE':
                    return res.status(400).json({ success: false, message: err.message });
            }
        }
        else {
            addUser(loginUserId, nickname, password, appPush, (err, result) => {
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


//중복확인 함수
const userIdCheckProgress = (req, res) => {
    const loginUserId = req.body.loginUserId;
    const idRegex = /^[A-Za-z0-9]{3,15}$/;

    if(!loginUserId){
        console.log('아이디 미입력');
        return res.status(400).json({success : false, message : '아이디를 입력해주세요.'});
    }

    if(!idRegex.test(loginUserId)){
        console.log('아이디 조건 미충족');
        return res.status(400).json({success : false, message : '아이디는 3-15자의 영어, 숫자만 가능합니다.'});
    }
    userIdCheck(loginUserId, (err, result)=>{
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