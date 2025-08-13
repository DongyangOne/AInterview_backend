const { myInfo, pwCheck, updatePw, updateName, getAppPush, updateAppPush, getFeedCount, getFeedContent, deleteUser } = require('../../models/mypage/mypageModel');

//backend-20
//사용자 정보 조회
const myInfoProgress = (req, res) => {
    const requestTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const { method, originalUrl } = req;

    const loginUser = req.session.user;

    //세션 존재 유무 확인
    if (!loginUser) {
        console.log('로그인 필요');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${401}`);
        return res.status(401).json({ success: false, message: '로그인 필요' });
    }

    const userId = req.query.userId;

    if (!userId) {
        console.log('미입력 정보 존재');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
        return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다.' });
    }

    myInfo(userId, (err, result) => {
        if (err) {
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
            return res.status(500).json({ success: false, message: 'db오류' });
        } else {
            console.log('사용자 정보 불러오기 성공');
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${200}`);
            return res.status(200).json({ success: true, message: '사용자 정보 불러오기 성공', userId: result[0].user_id, nickname: result[0].nickname, profile: result[0].image_url });
        }
    })
}

//backend-21
//비밀번호 변경 함수
const pwChange = (req, res) => {
    const requestTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const { method, originalUrl } = req;

    const pw = req.body.password;
    const newPw = req.body.newPassword;
    const newPwCheck = req.body.newPasswordCheck;
    const loginUser = req.session.user;
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*]{8,16}$/;
    if (!loginUser) {
        console.log('로그인 필요');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${401}`);
        return res.status(401).json({ success: false, message: '로그인 필요' });
    }

    const loginUserId = req.session.user.id;
    const inputErrors = [];
    const errors = [];


    pwCheck(loginUserId, pw, (err, result) => {
        if (err) {
            switch (err.code) {
                case 'DB_ERROR':
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
                    return res.status(500).json({ success: false, message: err.message });
                case 'INVALID_PASSWORD':
                    if (!pw) {
                        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
                        return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다.', error: ['현재 비밀번호를 입력해주세요.'] });
                    }
                    else {
                        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${401}`);
                        return res.status(401).json({ success: false, message: '형식에 맞지 않는 값이 존재합니다.', error: ['현재 비밀번호를 틀렸습니다. 다시 입력해주세요.'] });
                    }
            }
        }

        if (!newPw) inputErrors.push('새 비밀번호를 입력해주세요.');
        else if (!passwordRegex.test(newPw)) errors.push('비밀번호는 8-16자의 영어대소문자, 숫자, 특수문자(!,@,#,$,%,^,&,*)만 가능합니다.');

        if (!newPwCheck) inputErrors.push('새 비밀번호 확인을 입력해주세요.');
        else if (newPw !== newPwCheck) errors.push('새 비밀번호확인이 일치하지 않습니다.');

        if (inputErrors.length > 0) {
            console.log('입력 값 검증 실패 : ', inputErrors);
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
            return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다.', error: inputErrors });
        }
        if (errors.length > 0) {
            console.log('입력 값 검증 실패 : ', errors);
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
            return res.status(400).json({ success: false, message: '형식에 맞지 않는 값이 존재합니다.', error: errors });
        }

        updatePw(loginUserId, newPw, (err, result) => {
            if (err) {
                console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
                return res.status(500).json({ success: false, message: 'db오류' });
            } else {
                console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${200}`);
                return res.status(200).json({ success: true, message: '비밀번호 변경 완료' });
            }
        })
    })
}

//backend-22
//닉네임 변경 함수
const nicknameChange = (req, res) => {
    const requestTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const { method, originalUrl } = req;

    const newName = req.body.newName;
    const loginUser = req.session.user;
    const nicknameRegex = /^[가-힣A-Za-z0-9]{2,8}$/;

    if (!loginUser) {
        console.log('로그인 필요');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${401}`);
        return res.status(401).json({ success: false, message: '로그인 필요' });
    }

    const loginUserId = req.session.user.id;

    if (!newName) {
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
        return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다.', error: ['변경할 닉네임을 입력해주세요.'] });
    }
    else if (!nicknameRegex.test(newName)) {
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
        return res.status(400).json({ success: false, message: '닉네임은 2-8자의 한글, 영어, 숫자만 가능합니다. (부적절한 단어 사용 x)' });
    }

    updateName(loginUserId, newName, (err, result) => {
        if (err) {
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
            return res.status(500).json({ success: false, message: 'db오류' });
        }
        else {
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${200}`);
            return res.status(200).json({ success: true, message: '닉네임 변경 완료' });
        }
    })

}
//backend-23
//앱 푸시 설정 함수
const setAppPush = (req, res) => {
    const requestTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const { method, originalUrl } = req;

    const loginUser = req.session.user;
    let updateInfo;
    if (!loginUser) {
        console.log('로그인 필요');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${401}`);
        return res.status(401).json({ success: false, message: '로그인 필요' });
    }

    const loginUserId = req.session.user.id;

    getAppPush(loginUserId, (err, result) => {
        if (err) {
            console.log(err);
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
            return res.status(500).json({ success: false, message: 'db오류' });
        }
        else {
            if (result[0].push_agreed === 'N') updateInfo = 'Y';
            else updateInfo = 'N';

            updateAppPush(loginUserId, updateInfo, (err, result) => {
                if (err) {
                    console.log(err);
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
                    return res.status(500).json({ success: false, message: 'db오류' });
                }
                else {
                    console.log('알람 수신 전환 완료');
                    getAppPush(loginUserId, (err, result) => {
                        if (err) {
                            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
                            return res.status(500).json({ success: false, message: 'db오류' });
                        }
                        else {
                            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${200}`);
                            return res.status(200).json({ success: true, message: '알람 수신 정보 전환 완료', status: result[0].push_agreed });
                        }
                    })
                }
            })
        }
    })

}

//앱 푸시 현재 상태 가져오기
const appPushState = (req, res) => {
    const requestTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const { method, originalUrl } = req;

    const loginUser = req.session.user;
    if (!loginUser) {
        console.log('로그인 필요');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${401}`);
        return res.status(401).json({ success: false, message: '로그인 필요' });
    }

    const loginUserId = req.session.user.id;

    getAppPush(loginUserId, (err, result) => {
        if (err) {
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
            return res.status(500).json({ success: false, message: 'db오류' });
        }
        else {
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${200}`);
            return res.status(200).json({ success: true, message: '현재 알람 수신 상태', status: result[0].push_agreed });
        }
    })

}

//backend-24
//비밀번호 일치 확인용 함수
const passwordCheck = (req, res) => {
    const requestTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const { method, originalUrl } = req;

    const password = req.body.password;
    const loginUser = req.session.user;

    if (!loginUser) {
        console.log('로그인 필요');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${401}`);
        return res.status(401).json({ success: false, message: '로그인 필요' });
    }

    const loginUserId = req.session.user.id;

    if (!password) {
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${400}`);
        return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다.', error: ['비밀번호를 입력해주세요.'] });
    }
    else {
        pwCheck(loginUserId, password, (err, result) => {
            if (err) {
                switch (err.code) {
                    case 'DB_ERROR':
                        console.log(err.error);
                        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
                        return res.status(500).json({ success: false, message: err.message });
                    case 'INVALID_PASSWORD':
                        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${401}`);
                        return res.status(401).json({ success: false, message: '형식에 맞지 않는 값이 존재합니다.', error: ['비밀번호를 틀렸습니다. 다시 입력해주세요.'] });
                }
            }
            else {
                console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${200}`);
                return res.status(200).json({ success: true, message: '올바른 비밀번호' });
            }
        })
    }
}

//backend-25
//현재 사용자의 피드백 정보 조회 함수
const feedInfoProgress = (req, res) => {
    const requestTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const { method, originalUrl } = req;

    const loginUser = req.session.user;
    let feedCount = 0;
    if (!loginUser) {
        console.log('로그인 필요');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${401}`);
        return res.status(401).json({ success: false, message: '로그인 필요' });
    }
    const loginUserId = req.session.user.id;

    getFeedCount(loginUserId, (err, result) => {
        if (err) {
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
            return res.status(500).json({ success: false, message: '피드백 정보 조회 중 오류' });
        }
        else {
            console.log('총 개수 조회 완료');
            feedCount = result[0].feedback_count;
            if (feedCount === 0) {
                console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${200}`);
                return res.status(200).json({ success: true, count: 0, list: [] });
            }
            getFeedContent(loginUserId, (err, results) => {
                if (err) {
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
                    return res.status(500).json({ success: false, message: 'db오류' });
                }
                else {
                    console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${200}`);
                    return res.status(200).json({ success: true, count: feedCount, list: results });
                }
            })
        }
    })
}

//탈퇴 함수
const deleteUserProgress = (req, res) => {
    const requestTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const { method, originalUrl } = req;

    const loginUser = req.session.user;

    if (!loginUser) {
        console.log('로그인 필요');
        console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${401}`);
        return res.status(401).json({ success: false, message: '로그인 필요' });
    }

    const loginUserId = req.session.user.id;

    deleteUser(loginUserId, (err, result) => {
        if (err) {
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${500}`);
            return res.status(500).json({ success: false, message: '탈퇴 중 오류' });
        }
        else {
            console.log(`[${requestTime}] ${method} ${originalUrl} -> 응답 ${200}`);
            return res.status(200).json({ success: true, message: '탈퇴 완료' });
        }
    })

}

module.exports = {
    myInfoProgress,
    pwChange,
    nicknameChange,
    setAppPush,
    passwordCheck,
    feedInfoProgress,
    deleteUserProgress,
    appPushState
}
