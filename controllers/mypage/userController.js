const { pwCheck, updatePw } = require('../../models/userModel');

const pwChange = (req, res) => {
    const pw = req.query.password;
    const newPw = req.query.newPassword;
    const newPwCheck = req.query.newPasswordCheck;
    const loginUser = req.session.user;
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*]{8,16}$/;
    if (!loginUser) {
        console.log('로그인 필요');
        return res.status(401).json({ success: false, message: '로그인 필요' });
    }

    const loginUserId = req.session.user.id;
    const errors = [];


    pwCheck(loginUserId, pw, (err, result) => {
        if (err) {
            switch (err.code) {
                case 'DB_ERROR':
                    return res.status(500).json({ success: false, message: err.message });
                case 'INVALID_PASSWORD':
                    if (!pw) errors.push('현재 비밀번호를 입력해주세요.');
                    else {
                        errors.push('현재 비밀번호를 틀렸습니다. 다시 입력해주세요.');
                    }
            }
        }



        if (!newPw) errors.push('새 비밀번호를 입력해주세요.');
        else if (!passwordRegex.test(newPw)) errors.push('비밀번호는 8-16자의 영어대소문자, 숫자, 특수문자(!,@,#,$,%,^,&,*)만 가능합니다.');

        if (!newPwCheck) errors.push('새 비밀번호 확인을 입력해주세요.');
        else if (newPw !== newPwCheck) errors.push('새 비밀번호확인이 일치하지 않습니다.');

        if (errors.length > 0) {
            console.log('입력 값 검증 실패 : ', errors);
            return res.status(400).json({ success: false, messages: errors });
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

module.exports = {
    pwChange
}