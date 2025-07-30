const db = require('../config/database');

//auth
//backend-0 로그인
const loginCheck = (userId, password, callback)=>{
    const sql = `
        select id, user_id, password
        from users
        where user_id = ?
    `;
    db.query(sql, [userId], (err, result)=>{
        if(err){
            console.log('db오류 : ', err);
            return callback({code : 'DB_ERROR', message : 'db오류', error : err});
        }

        if(result.length == 0){
            console.log('존재하지 않는 아이디');
            return callback({code : 'USER_NOT_FOUND', message : '존재하지 않는 아이디'});
        }
        else{
            if(result[0].password != password){
                console.log('잘못된 비밀번호');
                return callback({code : 'INVALID_PASSWORD', message : '잘못된 비밀번호'});
            }else{
                console.log('로그인 성공');
                callback(null, result);
            }
        }
    })
};

//backend-1 회원가입 
const addUser = (userId, userName, password, appPush, callback)=>{ //모든 조건 충족 시 실행하는 회원가입 함수
    const sql = `
        insert into users(user_id, nickname, password, service_agreed, push_agreed)
        values (?, ?, ?, 'Y', ?)
    `;
    db.query(sql, [userId, userName, password, appPush], (err, result)=>{
        if(err){
            console.log('db오류 : ', err);
            return callback({code : 'DB_ERROR', message : 'db오류', error : err});
        }else{
            console.log('회원가입 완료');
            callback(null, true);
        }
    })
};

//backend-1 아이디 중복 확인 
const userIdCheck = (userId, callback) =>{ //아이디 중복 확인
    const sql = `
        select user_id
        from users
        where user_id = ? `;
    db.query(sql, [userId], (err, result)=>{
        if(err){
            console.log('db오류 : ', err);
            return callback({code : 'DB_ERROR', message : 'db오류', error : err});
        }
        
        if(result.length > 0){
            console.log('사용중인 아이디');
            return callback({code : 'ID_DUPLICATE', message : '사용중인 아이디'});
        }else{
            console.log('사용가능한 아이디');
            callback(null, true);
        }
    })
}


//mainpage
//backend-2 일주일 일정 조회
const TwTODO=(userId,callback)=>{
    const sql=
    'SELECT calendar_id, title FROM calendar WHERE  DATE(time) BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL WEEKDAY(CURRENT_DATE()) DAY) AND DATE_ADD(CURRENT_DATE(), INTERVAL (6 - WEEKDAY(CURRENT_DATE())) DAY) AND users_id = ?;'
     db.query(sql,[userId],(err,result)=>{
          if(err){
            console.log('오류 : ', err);
            return callback({code : 'feedback_error', message : '캘린더 오류', error : err});
        }
        console.log(result)
        return callback(null,result);
    })
}

//backend-3 가장 최근 피드백 조회 
const recentFeedback=(userId,callback)=>{
    const sql=
    `SELECT feedback_id, userId, title, content, created_at, datediff(date(now()), date(created_at)) as days_ago
    FROM feedback WHERE userId = ? ORDER BY created_at DESC LIMIT 1`;
     db.query(sql,[userId],(err,result)=>{
          if(err){
            console.log('오류 : ', err);
            return callback({code : 'feedback_error', message : '피드백오류', error : err});
        }
        console.log(result)
        return callback(null,result);
    })
}

//backend-4 오늘의 질문 조회
const todayQuestion=(callback)=>{
    const sql=
    'SELECT * FROM questions ORDER BY RAND()LIMIT 1;';
     db.query(sql,(err,result)=>{
          if(err){
            console.log('오류 : ', err);
            return callback({code : 'feedback_error', message : '피드백오류', error : err});
        }
        console.log(result)
        return callback(null,result);

    })
}

//backend-5

//backend-6

//feedback
//backend-7 리스트 조회
const findAllByUserId = ({ userId }, callback) => {
  const sql = `
    SELECT feedback_id AS id, title, memo, created_at
    FROM feedback
    WHERE userId = ?
    ORDER BY created_at DESC
  `;

 db.query(sql, [userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows);
  });
};


//피드백 제목 수정
//backend-8 제목 조회
const findTitleById = ({ feedbackId, userId }, callback) => {
  const sql = "SELECT title FROM feedback WHERE feedback_id = ? AND userId = ?";
  db.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};


// 8번: 제목 수정
const updateTitle = ({ feedbackId, title, userId }, callback) => {
  const sql = "UPDATE feedback SET title = ?, updated_at = NOW() WHERE feedback_id = ? AND userId = ?";
  db.query(sql, [title, feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

//backend-9 피드백 메모 수정
const findMemoById = ({ feedbackId, userId }, callback) => {
  const sql = "SELECT memo FROM feedback WHERE feedback_id = ? AND userId = ?";
  db.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};

// 9번: 메모 수정
const updateMemo = ({ feedbackId, memo, userId }, callback) => {
  if (memo.length > 50) {
    return callback(new Error('메모는 50자 이하로 입력해주세요.'), null);
  }
  const sql = "UPDATE feedback SET memo = ?, updated_at = NOW() WHERE feedback_id = ? AND userId = ?";
  db.query(sql, [memo, feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

//backend-10 피드백 검색
const searchFeedbacks = (keyword, callback) => {
   const sql = `SELECT feedback_id, userId, COUNT(feedback_id) as \`조회된 피드백\`,
  title, memo, pin, created_at FROM feedback WHERE title LIKE ? ORDER BY created_at DESC`;
  db.query(sql, [`%${keyword}%`], callback);
};

//backend-11 피드백 정렬
const sortFeedbacks = (orderBy, callback) => {
  const sql = `SELECT feedback_id, userId, title, memo, pin, created_at FROM feedback ORDER BY pin DESC, ${orderBy}`;
  db.query(sql, callback);
};

//backend-12 피드백 상단 고정/ 고정 해제
const pinFeedback = (feedback_id, callback) => {
  const sql = "UPDATE feedback SET pin = 'Y' WHERE feedback_id = ?";
  db.query(sql, [feedback_id], (err, result)=> {
    if (err){
      return callback(err);
    }
    else {
      return callback(null, result);
    }
  });
};

const unpinFeedback = (feedback_id, callback) => {
  const sql = "UPDATE feedback SET pin = 'N' WHERE feedback_id = ?";
  db.query(sql, [feedback_id], (err, result) =>{
    if (err) {
      return callback(err);
    }
    else {
      return callback(null, result);
    }
  });
};

//backend-13 피드백 삭제
const deleteById = ({ feedbackId, userId }, callback) => {
  const sql = `
    DELETE FROM feedback
    WHERE feedback_id = ? AND userId = ?
  `;
  db.query(sql, [feedbackId, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

//backend-14 피드백 상세 조회
const findById = ({ feedbackId, userId }, callback) => {
  const sql = `
    SELECT 
      feedback_id AS id, 
      userId, 
      title, 
      content, 
      memo, 
      created_at
    FROM feedback
    WHERE feedback_id = ? AND userId = ?
  `;
  db.query(sql, [feedbackId, userId], (err, rows) => {
    if (err) return callback(err, null);
    callback(null, rows[0]);
  });
};



//calendar
//backend-15 해당 달 조회
const getUserMonth = (userId, year, month, callback) => {
    const sql = `select date_format(time, '%Y') as 년도, date_format(time, '%m') as 월, calendar_id, date_format(time, '%d') as 일, title
    from calendar where users_id = ? and YEAR(time) = ? and MONTH(time) = ?
    order by created_at desc`;

    db.query(sql, [userId, year, month], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

//backend-16 일정 상세 조회
const getUserDay = (userId, year, month, day, callback) => {
    const sql = `select calendar_id, title, DATE_FORMAT(time, '%Y-%m-%d') AS 날짜,
    date_format(time, '%k:%i') as 시간,
    CASE DAYOFWEEK(time)
        WHEN 1 THEN '일'
        WHEN 2 THEN '월'
        WHEN 3 THEN '화'
        WHEN 4 THEN '수'
        WHEN 5 THEN '목'
        WHEN 6 THEN '금'
        WHEN 7 THEN '토' END as 요일, 
        CASE importance
        when 'S' then '매우 중요'
        when 'I' then '중요'
        when 'N' then 'X'
        end as importance, memo 
    from calendar where users_id = ? and YEAR(time) = ? and MONTH(time) = ? and DAY(time) =?
    order by created_at desc`;

    db.query(sql, [userId, year, month, day], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

//backend-17 일정 생성
const createDate = (userId, title, time, importance, memo, callback) => {
    const sql = `insert into calendar (users_id, title, time, importance, memo)
    values (?, ?, ?, ?, ?)`;

    db.query(sql, [userId, title, time, importance, memo], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

//backend-18 일정 수정
const getCalendarUpdate = (userId, title, time, importance, memo, callback) => { //모든 컬럼을 한 번에 수정하지 않고 하나하나 컬럼을 수정할 수 있게 함
    let sql = `update calendar set `;
    const arr = [], values = [];

    if (title !== undefined){
        arr.push(`title = ?`);
        values.push(title);
    }

    if (time !== undefined){
        arr.push(`time = ?`);
        values.push(time);
    }

    if (importance !== undefined){
        arr.push(`importance = ?`);
        values.push(importance);
    }

    if (memo !== undefined){
        arr.push(`memo = ?`);
        values.push(memo);
    }

    sql += arr.join(`, `) + `where users_id = ?`;
    values.push(userId);

    db.query(sql, values, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};


//backend-19 일정 삭제
const getCalendarDelete = (calendar_id, callback) => {
    const sql = `delete from calendar where calendar_id = ?`;
    db.query(sql, [calendar_id], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

//mypage
//backend-20 정보 조회
const myInfo = (id, callback) => {    //id : 유저식별번호
    const sql = `
        select user_id, nickname, image_url
        from users
        where id = ?;
    `;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('db오류 : ', err);
            return callback({ code: 'DB_ERROR', message: 'db오류', error: err });
        }else{
            callback(null, result);
        }
    })
}


//backend-21 비밀번호 변경
const updatePw = (id, pw, callback)=>{
    const sql = `
        update users
        set password = ?
        where id = ?;
    `;
    db.query(sql, [pw, id], (err, result)=>{
        if(err){
            console.log('db오류');
            return callback({ code: 'DB_ERROR', message: 'db오류', error: err });
        }else{
            console.log('비밀번호 변경 완료');
            callback(null, true);
        }
    })
}

//backend-22 닉네임 변경
const updateName = (id, nickname, callback)=>{
    const sql = `
        update users
        set nickname = ?
        where id = ?;
    `;
    db.query(sql, [nickname, id], (err, result)=>{
        if(err){
            console.log('db오류');
            return callback(err);
        }
        else{
            console.log('닉네임 변경 완료');
            callback(null, true);
        }
    })
}

//backend-23 앱 푸시 데이터 불러오기
const getAppPush = (id, callback)=>{
    const sql = `
        select push_agreed
        from users
        where id = ?;
    `;
    db.query(sql, [id], (err, result)=>{
        if(err){
            console.log('db오류');
            return callback(err);
        }
        else{
            console.log('사용자의 앱 푸시 데이터 불러오기 성공');
            return callback(null, result);
        }
    })
}

//backend-23 앱 푸시 정보 업데이트
const updateAppPush = (id, appPush, callback)=>{
    const sql = `
        update users
        set push_agreed = ?
        where id = ?;
    `;
    db.query(sql, [appPush, id], (err, result)=>{
        if(err){
            console.log('db오류');
            return callback(err);
        }
        else{
            console.log('앱 푸시 업데이트 성공');
            return callback(null, true);
        }
    })
}


//backend-24 비밀번호 일치 확인
const pwCheck = (id, pw, callback)=>{
    const sql = `
        select password
        from users
        where id = ?;
    `;
    db.query(sql, [id], (err, result)=>{
        if(err){
            console.log('db오류');
            return callback({ code: 'DB_ERROR', message: 'db오류', error: err });
        }else{
            if(result[0].password !== pw){
                console.log('잘못된 비밀번호');
                return callback({code : 'INVALID_PASSWORD', message : '잘못된 비밀번호'});
            }
            else{
                console.log('올바른 비밀번호');
                callback(null, true);
            }
        }
    })
}

//탈퇴하는 회원 정보 불러오기
//backend-25 피드백 총 개수
const getFeedCount = (id, callback)=>{
    const sql = `
        select count(*) as feedback_count
        from feedback
        where userId = ?;
    `;
    db.query(sql, [id], (err, result)=>{
        if(err){
            return callback(err);
        }
        else{
            return callback(null, result);
        }
    })
}

//피드백 내용(제목, 날짜)
const getFeedContent = (id, callback)=>{
    const sql = `
        select title, created_at
        from feedback
        where userId = ?
        order by created_at desc
    `
    db.query(sql, [id], (err, results)=>{
        if(err){
            return callback(err);
        }
        else{
            return callback(null, results);
        }
    })
}

//탈퇴를 위한 promise (db실행) 함수
function queryAsync(sql, params){
    return new Promise((resolve, reject)=>{
        db.query(sql, params, (err, result)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(result)
            }
        })
    })
}


//회원탈퇴
 const deleteUser = async (user_id, callback)=>{
    try{
        const feedbacks = await queryAsync('select feedback_id from feedback where userId = ?', [user_id]);
        for(let i = 0; i < feedbacks.length; i++){
            feed_id = feedbacks[i].feedback_id;
            await queryAsync('delete from analysis where feedback_id = ?', [feed_id]);
            await queryAsync('delete from feedback where feedback_id = ?', [feed_id]);
        }
        
        const questions = await queryAsync('select questions_id from questions where users_id = ?', [user_id]);
        for(let i = 0; i < questions.length; i++){
            question_id = questions[i].questions_id;
            await queryAsync('delete from interviews where questions_id = ?', [question_id]);
        }

        await queryAsync('delete from interviews where users_id = ?', [user_id]);
        await queryAsync('delete from questions where users_id = ?', [user_id]);
        await queryAsync('delete from notice where users_id = ?', [user_id]);
        await queryAsync('delete from feedback where userId = ?', [user_id]);
        await queryAsync('delete from calendar where users_id = ?', [user_id]);
        await queryAsync('delete from users where id = ?', [user_id]);

        console.log('회원탈퇴 완료');
        callback(null, true);
    }catch(err){
        console.log('에러 : ', err);
        callback(err);
    }
}

module.exports = {
    loginCheck,
    addUser,
    userIdCheck,
    recentFeedback,
    TwTODO,
    todayQuestion,
    findAllByUserId,
    findTitleById,
    updateTitle,
    findMemoById,
    updateMemo,
    searchFeedbacks,
    sortFeedbacks,
    pinFeedback,
    unpinFeedback,
    deleteById,
    findById,
    getUserMonth,
    getUserDay,
    createDate,
    getCalendarUpdate,
    getCalendarDelete,
    myInfo,
    pwCheck,
    updatePw,
    updateName,
    getAppPush,
    updateAppPush,
    getFeedCount,
    getFeedContent,
    deleteUser
}
