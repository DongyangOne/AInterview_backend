const { loginCheck, addUser, userIdCheck } = require('../../models/auth/authModel');

//backend-0
//로그인 함수
const signinProgress = (req, res) => {
    const requestTime = new Date().toLocaleString('ko-KR', {timeZone : 'Asia/Seoul'});
    const{method, originalUrl} = req;

    const loginUserId = req.body.loginUserId;
    const password = req.body.password;
    if (!loginUserId) {
        console.log('아이디 미입력');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
        return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다.' });
    }
    if (!password) {
        console.log('비밀번호 미입력');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
        return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다.' });
    }
    loginCheck(loginUserId, password, (err, result) => {
        if (err) {
            switch (err.code) { //각종 에러 처리
                case 'DB_ERROR':
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
                    return res.status(500).json({ success: false, message: err.message });
                case 'USER_NOT_FOUND':
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${404}`);
                    return res.status(404).json({ success: false, message: err.message });
                case 'INVALID_PASSWORD':
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${401}`);
                    return res.status(401).json({ success: false, message: err.message });
            }
        }

        //세션 등록
        req.session.user = {
            id: result[0].id,
            userId: result[0].user_id
        }
        console.log('세션 등록 완료');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${200}`);
        res.status(200).json({ success: true, loginUserId: result[0].user_id, userId : result[0].id, nickname: result[0].nickname, message: '로그인 상태' });
    })
}

const logoutProgress = (req, res)=>{ //로그아웃 함수
    const requestTime = new Date().toLocaleString('ko-KR', {timeZone : 'Asia/Seoul'});
    const{method, originalUrl} = req;
    //세션 삭제
    req.session.destroy((err)=>{
        if(err){
            console.log('세션 삭제 중 오류 : ',err);
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
            return res.status(500).json({success : false, message : '로그아웃 중 오류'});
        }
        res.clearCookie('connect.sid'); //세션 쿠키 삭제
        console.log('로그아웃 완료');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${200}`);
        return res.status(200).json({success : true, message : '로그아웃 성공'});
    });
}

//backend-1
//회원가입 함수
const signupProgress = (req, res) => {
    const requestTime = new Date().toLocaleString('ko-KR', {timeZone : 'Asia/Seoul'});
    const{method, originalUrl} = req;

    const loginUserId = req.body.loginUserId;
    const nickname = req.body.nickname;
    const password = req.body.password;
//    const passwordCheck = req.body.passwordCheck;
    let service = req.body.service === 'Y' ? 'Y' : 'N'; //서비스 동의 추가
    let appPush = req.body.appPush === 'Y' ? 'Y' : 'N';
//    const idCheck = req.body.idCheck;
    //사용자 아이디 중복확인 여부 : 해당 여부는 프론트에서 중복확인 검사를 햇을 경우에 true로 넘겨줘야 함. 기본 값 fasle로 안햇을 경우는 false로 넘기기
    //->주의할 점 : 사용자가 중복확인 후 다른 아이디로 바꿔서 썼을 때는 다시 false로 돌려줘야 된다.
    //아래는 정규표현식 정의(아이디 조건 등)
    const idRegex = /^[A-Za-z0-9]{3,15}$/;
    const nicknameRegex = /^[가-힣A-Za-z0-9]{2,8}$/;
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*]{8,16}$/;

    const inputErrors = [];
    const errors = [];

    //조건충족 검사
    if (!loginUserId) inputErrors.push('아이디를 입력해주세요.');
    else if (!idRegex.test(loginUserId)) errors.push('아이디는 3-15자의 영어, 숫자만 가능합니다.');

    if (!nickname) inputErrors.push('닉네임을 입력해주세요.');
    else if (!nicknameRegex.test(nickname)) errors.push('닉네임은 2-8자의 한글, 영어, 숫자만 가능합니다. (부적절한 단어 사용 x)');

    if (!password) inputErrors.push('비밀번호를 입력해주세요.');
    else if (!passwordRegex.test(password)) errors.push('비밀번호는 8-16자의 영어대소문자, 숫자, 특수문자(!,@,#,$,%,^,&,*)만 가능합니다.');

//    if (!passwordCheck) inputErrors.push('비밀번호 확인을 입력해주세요.');
//    else if (password !== passwordCheck) errors.push('비밀번호가 일치하지 않습니다.');

    //아이디 중복확인 여부 검사
//    if (!idCheck) {
//        inputErrors.push('아이디 중복확인이 필요합니다.');
//    }


    if(service === 'N'){
        errors.push('서비스 이용약관에 동의해 주세요.');
    }

    if(inputErrors.length > 0){
        console.log('입력 값 검증 실패 : ', inputErrors);
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
        return res.status(400).json({success : false, message : '미입력 정보가 존재합니다.', error : inputErrors});
    }

    if (errors.length > 0) {
        console.log('입력 값 검증 실패 : ', errors);
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
        return res.status(400).json({ success: false, messages: '형식에 맞지 않는 값이 존재합니다.', error : errors });
    }


    
//backend-1
  userIdCheck(loginUserId, (err, result) => {
        if (err) {
            switch (err.code) {
                case 'DB_ERROR':
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
                    return res.status(500).json({ success: false, message: err.message });
                case 'ID_DUPLICATE':
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${409}`);
                    return res.status(409).json({ success: false, message: err.message });
            }
        }
        else {
            addUser(loginUserId, nickname, password, appPush, (err, result) => {
                if (err) {
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
                    return res.status(500).json({ success: false, meesage: 'db오류' });
                }
                else if (result === true) {
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${201}`);
                    return res.status(201).json({ success: true, message: '계정 생성 완료' });
                }
            })

        }
    })
}


//중복확인 함수
const userIdCheckProgress = (req, res) => {
    const requestTime = new Date().toLocaleString('ko-KR', {timeZone : 'Asia/Seoul'});
    const{method, originalUrl} = req;

    const loginUserId = req.body.loginUserId;
    const idRegex = /^[A-Za-z0-9]{3,15}$/;

    if(!loginUserId){
        console.log('아이디 미입력');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
        return res.status(400).json({success : false, message : '미입력 정보가 존재합니다.'});
    }

    if(!idRegex.test(loginUserId)){
        console.log('아이디 조건 미충족');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
        return res.status(400).json({success : false, message : '아이디는 3-15자의 영어, 숫자만 가능합니다.'});
    }
    userIdCheck(loginUserId, (err, result)=>{
        if(err){
            switch (err.code) {
                case 'DB_ERROR':
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
                    return res.status(500).json({ success: false, message: err.message });
                case 'ID_DUPLICATE':
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${409}`);
                    return res.status(409).json({ success: false, message: err.message });
            }
        }
        else{
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${200}`);
            return res.status(200).json({success : true, message : '사용가능한 아이디'});
        }
    })
}

module.exports = {
    signinProgress,
    logoutProgress,
    signupProgress,
    userIdCheckProgress
}

