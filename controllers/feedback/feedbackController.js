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

//backend-7
const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split('T')[0];
};

const getAllFeedback = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다." });
  }

  findAllByUserId({ userId }, (err, feedbackList) => {
    if (err) {
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }

    const formattedList = feedbackList.map(feedback => ({
      id: feedback.id,
      title: feedback.title,
      memo: feedback.memo,
      created_at: formatDate(feedback.created_at)
    }));

    res.status(200).json({
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

    if (err) return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    
    res.status(200).json({ success: true, message: '기존 제목 조회 성공', data });
  });
};

// 8번: 제목 수정 
const updateFeedbackTitle = (req, res) => {
  const { userId, feedbackId } = req.params;
  const { title } = req.body;

  if (!title) return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다(title)' });
  if (title.length > 20) return res.status(400).json({ success: false, message: '제목은 20자 이하로 입력해주세요.' });
  
  updateTitle({ feedbackId, title, userId }, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류', error: err.message });

    
    res.status(200).json({ success: true, message: '피드백 제목이 성공적으로 수정되었습니다.' });
  });
};

//backend-9

// 기존 메모 불러오기
const getFeedbackMemo = (req, res) => {
  const { userId, feedbackId } = req.params;

  findMemoById({ feedbackId, userId }, (err, data) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
   
 
    res.status(200).json({ success: true, message: '기존 메모 조회 성공', data });
  });
};


// 9번: 메모 수정 
const updateFeedbackMemo = (req, res) => {
  const { userId, feedbackId } = req.params;
  const { memo } = req.body;
  if (memo === undefined) return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다' });
  if (memo.length > 50) return res.status(400).json({ success: false, message: '메모는 50자 이하로 입력해주세요.' });

 updateMemo({ feedbackId, memo, userId }, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '서버 오류', error: err.message });

    
    res.status(200).json({ success: true, message: '피드백 메모가 성공적으로 수정되었습니다.' });
  });
};


//backend-10
const searchFeedbacks2 = (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({
      success: false,
      message: "미입력 정보가 존재합니다 (keyword)"
    });
  }

  searchFeedbacks(keyword, (err, results) => {
    if (err) {
      console.error('피드백 검색 오류:', err);
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

  sortFeedbacks(orderBy, (err, result) => {
    if (err) {
      console.error('피드백 정렬 오류:', err);
      return res.status(500).json({
        success: false,
        message: "서버 오류",
        error: err.message
      });
    }
    res.status(200).json({
      success: true,
      message: "모든 피드백 조회 성공",
      data: result
    });
  });
};
   


//backend-12
// 피드백 상단 고정
const getPin = (req, res) => {
  const { feedback_id } = req.params;

  if (!feedback_id) {
    return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다 (feedback_id)' });
  }

  pinFeedback(feedback_id, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: '피드백 상단 고정 실패', error: err.message });
    }
    res.status(200).json({ success: true, message: '피드백 상단 고정 완료', data: result });
  });
};

// 피드백 상단 고정 해제
const getUnpin = (req, res) => {
  const { feedback_id } = req.params;

  if (!feedback_id) {
    return res.status(400).json({ success: false, message: '미입력 정보가 존재합니다 (feedback_id)' });
  }

  unpinFeedback(feedback_id, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: '피드백 상단 고정 해제 실패', error: err.message });
    }
    res.status(200).json({ success: true, message: '피드백 상단 고정 해제 완료', data: result });
  });
};


//backend-13
const deleteFeedback = (req, res) => {
  const { userId, feedbackId } = req.params;

deleteById({ feedbackId, userId }, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: '서버 오류',
        error: err.message
      });
    }

    res.status(200).json({
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
    return res.status(400).json({ success: false, message: "미입력 정보가 존재합니다." });
  }

  findById({ feedbackId, userId }, (err, feedback) => {
    if (err) {
      return res.status(500).json({ success: false, message: '서버 오류', error: err.message });
    }
  

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
searchFeedbacks,
sortFeedbacks: sortFeedbacksController,
getPin,
  getUnpin,
deleteFeedback,
getFeedbackDetail,
}
