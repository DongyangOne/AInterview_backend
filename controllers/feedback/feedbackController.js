const {
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
  createFeedback,
  updateFeedback,
  findPreviousFeedback,
} = require("../../models/feedback/feedbackModel");

// 타임스탬프 찍는 함수
const formatTimestamp = () => {
  const now = new Date();
  return `${now.getFullYear()}.${
    now.getMonth() + 1
  }.${now.getDate()}. ${now.getHours()}:${String(now.getMinutes()).padStart(
    2,
    "0"
  )}`;
};

const logSimple = (label, status) => {
  console.log(`${formatTimestamp()} ${label} ${status} 응답`);
};

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split("T")[0];
};

// ------------------- 컨트롤러 ------------------- //

// backend-7 피드백 리스트 조회
exports.getAllFeedback = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      logSimple("피드백 리스트 조회", 400);
      return res
        .status(400)
        .json({ success: false, message: "userId가 필요합니다." });
    }
    const feedbackList = await findAllByUserId({ userId });
    const formattedList = feedbackList.map((f) => ({
      id: f.id,
      title: f.title,
      content: f.content,
      memo: f.memo,
      created_at: formatDate(f.created_at),
      pin: f.pin,
    }));
    logSimple("피드백 리스트 조회", 200);
    res.json({
      success: true,
      message: "모든 피드백 조회 성공",
      data: formattedList,
    });
  } catch (err) {
    logSimple("피드백 리스트 조회", 500);
    res
      .status(500)
      .json({ success: false, message: "서버 오류", error: err.message });
  }
};

// backend-8 제목 조회
exports.getFeedbackTitle = async (req, res) => {
  try {
    const { userId, feedbackId } = req.params;
    const data = await findTitleById({ feedbackId, userId });
    logSimple("피드백 제목 조회", 200);
    res.json({ success: true, message: "기존 제목 조회 성공", data });
  } catch (err) {
    logSimple("피드백 제목 조회", 500);
    res
      .status(500)
      .json({ success: false, message: "서버 오류", error: err.message });
  }
};

// 제목 수정
exports.updateFeedbackTitle = async (req, res) => {
  try {
    const { userId, feedbackId } = req.params;
    const { title } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "title이 필요합니다." });
    }
    if (title.length > 20) {
      return res
        .status(400)
        .json({ success: false, message: "제목은 20자 이하" });
    }
    await updateTitle({ feedbackId, title, userId });
    res.json({ success: true, message: "제목 수정 성공" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "서버 오류", error: err.message });
  }
};

// backend-9 메모 조회
exports.getFeedbackMemo = async (req, res) => {
  try {
    const { userId, feedbackId } = req.params;
    const data = await findMemoById({ feedbackId, userId });
    res.json({ success: true, message: "메모 조회 성공", data });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "서버 오류", error: err.message });
  }
};

// 메모 수정
exports.updateFeedbackMemo = async (req, res) => {
  try {
    const { userId, feedbackId } = req.params;
    const { memo } = req.body;
    if (memo.length > 50) {
      return res
        .status(400)
        .json({ success: false, message: "메모는 50자 이하" });
    }
    await updateMemo({ feedbackId, memo, userId });
    res.json({ success: true, message: "메모 수정 성공" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "서버 오류", error: err.message });
  }
};

// backend-10 검색
exports.searchFeedbacks = async (req, res) => {
  try {
    const { userId } = req.params;
    const { keyword } = req.query;
    const results = await searchFeedbacks(userId, keyword);
    res.json({ success: true, data: results });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "검색 실패", error: err.message });
  }
};

// backend-11 정렬
exports.sortFeedbacks = async (req, res) => {
  try {
    const { userId } = req.params;
    const { by } = req.query;
    let orderBy = "created_at DESC";
    if (by === "alpha") orderBy = "title ASC";
    const results = await sortFeedbacks(userId, orderBy);
    res.json({ success: true, data: results });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "정렬 실패", error: err.message });
  }
};

// backend-12 고정
exports.getPin = async (req, res) => {
  try {
    const { feedbackId, userId } = req.params;
    const result = await pinFeedback(feedbackId, userId);
    res.json({ success: true, data: result });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "고정 실패", error: err.message });
  }
};

// 고정 해제
exports.getUnpin = async (req, res) => {
  try {
    const { feedbackId, userId } = req.params;
    const result = await unpinFeedback(feedbackId, userId);
    res.json({ success: true, data: result });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "고정 해제 실패", error: err.message });
  }
};

// backend-13 삭제
exports.deleteFeedback = async (req, res) => {
  try {
    const { userId, feedbackId } = req.params;
    await deleteById({ feedbackId, userId });
    res.json({ success: true, message: "삭제 성공" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "삭제 실패", error: err.message });
  }
};

// backend-14 상세 조회 (+ 이전 피드백 비교)
exports.getFeedbackDetail = async (req, res) => {
  try {
    const { userId, feedbackId } = req.params;
    const feedback = await findById({ feedbackId, userId });
    if (!feedback)
      return res.status(404).json({ success: false, message: "피드백 없음" });

    const previous = await findPreviousFeedback({ userId, feedbackId });
    let mostImproved = null;
    if (previous) {
      const keys = [
        "pose",
        "confidence",
        "facial",
        "risk_response",
        "tone",
        "understanding",
      ];
      let maxDiff = -Infinity;
      keys.forEach((key) => {
        const prev = previous[key] ?? 0;
        const curr = feedback[key] ?? 0;
        const diff = curr - prev;
        if (diff > maxDiff) {
          maxDiff = diff;
          mostImproved = [key];
        } else if (diff === maxDiff) {
          mostImproved.push(key);
        }
      });
    }
    res.json({
      success: true,
      data: {
        ...feedback,
        created_at: formatDate(feedback.created_at),
        mostImproved,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "상세 조회 실패", error: err.message });
  }
};

// backend-26 생성
exports.createNewFeedback = async (req, res) => {
  try {
    const data = req.body;
    if (!data.userId || !data.title) {
      return res
        .status(400)
        .json({ success: false, message: "userId, title 필요" });
    }
    const result = await createFeedback(data);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "생성 실패", error: err.message });
  }
};

// backend-27 본문 수정
exports.updateFeedbackContent = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const body = { ...req.body, feedbackId };
    await updateFeedback(body);
    res.json({ success: true, message: "본문 수정 성공" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "본문 수정 실패", error: err.message });
  }
};
