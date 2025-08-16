const {findAllByUserId,
    findTitleById,
    updateTitle,
    findMemoById,
    updateMemo,
    searchFeedbacks,
    sortFeedbacks,
    pinFeedback,
    unpinFeedback,
    deleteById,
    findById} = require('../../models/feedback/feedbackModel');

const formatTimestamp = () => {
  const now = new Date();
  return `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}. ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
};

const logSimple = (label, status) => {
  console.log(`${formatTimestamp()} ${label} ${status} 응답`);
};


//backend-7 피드백 리스트 조회

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};

const getAllFeedback = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
logSimple('피드백 리스트 조회', 400);
return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다." });
  }

  findAllByUserId({ userId }, (err, feedbackList) => {

   if (err) {

      logSimple('피드백 리스트 조회', 500);
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }

    const formattedList = feedbackList.map(feedback => ({
      id: feedback.id,
      title: feedback.title,
      memo: feedback.memo,
      created_at: formatDate(feedback.created_at)
    }));


logSimple('피드백 리스트 조회', 200);
    return res.status(200).json({

      success: true,
      message: '모든 피드백 조회 성공',
      data: formattedList
    });
  });
};



//backend-8
//  기존 제목 불러오기
const getFeedbackTitle = (req, res) => {
 


  const { userId, feedbackId } = req.params;

findTitleById({ feedbackId, userId }, (err, data) => {
    if (err) {
      logSimple('피드백 제목 조회', 500);
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }


    logSimple('피드백 제목 조회', 200);
    res.status(200).json({ success: true, message: '기존 제목 조회 성공', data });
  });
};




// 8번: 제목 수정 
const updateFeedbackTitle = (req, res) => {

   
  const { userId, feedbackId } = req.params;
  const { title } = req.body;

  if (!title)  {
    logSimple('피드백 제목 수정', 400);

   return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다(title)' });
  }

  if (title.length > 20)  {
    logSimple('피드백 제목 수정', 400);
    return res.status(400).json({ success: false, message: '제목은 20자 이하로 입력해주세요.' });
  }

  updateTitle({ feedbackId, title, userId }, (err, result) => {
    if (err) {
       logSimple('피드백 제목 수정', 500);
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }

    logSimple('피드백 제목 수정', 200);
    res.status(200).json({ success: true, message: '피드백 제목이 성공적으로 수정되었습니다.' });
  });
};



//backend-9

// 기존 메모 불러오기
const getFeedbackMemo = (req, res) => {
  
  const { userId, feedbackId } = req.params;

  findMemoById({ feedbackId, userId }, (err, data) => {
      if (err) {
      logSimple('피드백 메모 조회', 500);
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }

 logSimple('피드백 메모 조회', 200);
    res.status(200).json({ success: true, message: '기존 메모 조회 성공', data });
  });
};


// 9번: 메모 수정 
const updateFeedbackMemo = (req, res) => {
 

  const { userId, feedbackId } = req.params;
  const { memo } = req.body;

   if (memo === undefined) {
    logSimple('피드백 메모 수정', 400);
    return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다' });
  }

  if (memo.length > 50) {
    logSimple('피드백 메모 수정', 400);
    return res.status(400).json({ success: false, message: '메모는 50자 이하로 입력해주세요.' });
  }


 updateMemo({ feedbackId, memo, userId }, (err, result) => {
   if (err) {
      logSimple('피드백 메모 수정', 500);
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }

     logSimple('피드백 메모 수정', 200);
    res.status(200).json({ success: true, message: '피드백 메모가 성공적으로 수정되었습니다.' });
  });
};



//backend-10
const searchFeedbacksController = (req, res) => {
  const { keyword } = req.query;
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId가 필요합니다."
    });
  }
  if (!keyword) {
    return res.status(400).json({
      success: false,
      message: "미입력 정보가 존재합니다 (keyword)"
    });
  }

  searchFeedbacks(userId, keyword, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "서버 오류",
        error: err.message
      });
    }

    return res.status(200).json({
      success: true,
      data: results
    });
  });
};

//backend-11
const sortFeedbacksController = (req, res) => {
  const { by } = req.query;
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId가 필요합니다."
    });
  }

  let orderBy;
  if (!by) {
    orderBy = 'created_at DESC';
  } else if (by === 'alpha') {
    orderBy = 'title ASC';
  } else {
    return res.status(400).json({
      success: false,
      message: "정렬 기준이 올바르지 않습니다 (by: alpha)"
    });
  }

  sortFeedbacks(userId, orderBy, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "서버 오류",
        error: err.message
      });
    }
    res.status(200).json({
      success: true,
      message: "피드백 정렬 조회 성공",
      data: result
    });
  });
};


//backend-12
//피드백 상단 고정
const getPin = (req, res) => {
  const { feedbackId, userId } = req.params;

  if (!feedbackId || !userId) {
    console.log(`${formatTimestamp()} 피드백 상단 고정 400 응답`);
    return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다 (feedbackId, userId)' });
  }

  pinFeedback(feedbackId, userId, (err, result) => {
    if (err) {
      console.log(`${formatTimestamp()} 피드백 상단 고정 500 응답`);
      return res.status(500).json({ success: false, message: '피드백 상단 고정 실패', error: err.message });
    }
    console.log(`${formatTimestamp()} 피드백 상단 고정 200 응답`);
    res.status(200).json({ success: true, message: '피드백 상단 고정 완료', data: result });
  });
};

//피드백 상단 고정 해제
const getUnpin = (req, res) => {
  const { feedbackId, userId } = req.params;

  if (!feedbackId || !userId) {
    console.log(`${formatTimestamp()} 피드백 상단 고정 해제 400 응답`);
    return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다 (feedbackId, userId)' });
  }

  unpinFeedback(feedbackId, userId, (err, result) => {
    if (err) {
      console.log(`${formatTimestamp()} 피드백 상단 고정 해제 500 응답`);
      return res.status(500).json({ success: false, message: '피드백 상단 고정 해제 실패', error: err.message });
    }
    console.log(`${formatTimestamp()} 피드백 상단 고정 해제 200 응답`);
    res.status(200).json({ success: true, message: '피드백 상단 고정 해제 완료', data: result });
  });
};

//backend-13
const deleteFeedback = (req, res) => {
 const { userId, feedbackId } = req.params;

  deleteById({ feedbackId, userId }, (err, result) => {
    if (err) {
      logSimple('피드백 삭제', 500);
      return res.status(500).json({
        success: false,
        message: '서버 오류',
        error: err.message
      });
    }

    logSimple('피드백 삭제', 200);
    return res.status(200).json({
success: true,
      message: '피드백이 성공적으로 삭제되었습니다.'
    });
  });
};

//backend-14
const feedbackModel = require('../../models/feedback/feedbackModel');


const formatDate2 = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};


const getFeedbackDetail = (req, res) => {
 const { userId, feedbackId } = req.params;

 if (!userId || !feedbackId) {
    logSimple('피드백 상세 조회', 400);
    return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다." });
  }

  findById({ feedbackId, userId }, (err, feedback) => {
    if (err) {
      logSimple('피드백 상세 조회', 500);
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }


    if (!feedback) {
      logSimple('피드백 상세 조회', 404);
      return res.status(404).json({ success: false, message: '해당 피드백을 찾을 수 없습니다.' });
    }


    logSimple('피드백 상세 조회', 200);
    res.status(200).json({
      success: true,
      message: '피드백 상세 조회 성공',
      data: {
        ...feedback,
        created_at: formatDate2(feedback.created_at)
      }
    });
  });
};

module.exports= {
    getAllFeedback,
    getFeedbackTitle, 
    updateFeedbackTitle,
getFeedbackMemo,
updateFeedbackMemo,
searchFeedbacks: searchFeedbacksController,
sortFeedbacks: sortFeedbacksController,
getPin,
getUnpin,
deleteFeedback,
getFeedbackDetail,
}