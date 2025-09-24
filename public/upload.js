const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch"); // Python API 호출용

const router = express.Router();

const sambaPath = path.join(__dirname, "shared");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (!fs.existsSync(sambaPath)) {
        fs.mkdirSync(sambaPath, { recursive: true });
      }

      cb(null, sambaPath);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const safeName = `${Date.now()}_${file.originalname}`;
    cb(null, safeName);
  },
});

const limits = {
  fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
  fieldSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
  fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
  fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
  files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
};

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    callback(null, true);
  } else {
    console.log("허용되지 않는 확장자입니다", file.mimetype);
    callback(new Error("허용되지 않는 확장자입니다."));
  }
};

const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});

//Python 분석 API 호출
async function callPythonAnalyze(feedbackId, files) {
  const formData = new (require("form-data"))();
  formData.append("feedbackId", feedbackId);

  files.forEach((filePath, idx) => {
    formData.append("videos", fs.createReadStream(filePath));
  });

  const res = await fetch("http://127.0.0.1:8000/analyze", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Python API 오류", res.statusText);
  }

  return res.json();
}

// 제목만 생성된 피드백 본문 수정 API 호출 함수
async function callUpdateFeedback(feedbackId, userId, analysisResult) {
  // DB API에서 요구하는 형태에 맞춰 JSON 생성
  const payload = {
    userId,
    good: analysisResult.good,
    bad: analysisResult.bad,
    content: analysisResult.content,
    pose: analysisResult.pose,
    confidence: analysisResult.confidence,
    facial: analysisResult.facial,
    risk_response: analysisResult.risk_response,
    tone: analysisResult.tone,
    understanding: analysisResult.understanding,
  };

  const baseUrl = process.env.API_BASE_URL;
  const res = await fetch(`${baseUrl}/feedback/${feedbackId}/content`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text(); // ← 응답 메시지 확인
    throw new Error(
      `Feedback 수정 API 오류: ${res.status} ${res.statusText} - ${text}`
    );
  }

  return res.json();
}

function handleFile(req, res) {
  const { file1 } = req.files;
  const { name } = req.body;

  console.log("body 데이터: ", name);
  if (file1) {
    file1.forEach((data) => {
      console.log("file1");
      console.log("폼에 정의된 필드명 : ", data.fieldname);
      console.log("사용자가 업로드한 파일 명 : ", data.originalname);
      console.log("파일의 엔코딩 타입 : ", data.encoding);
      console.log("파일의 Mime 타입 : ", data.mimetype);
      console.log("파일이 저장된 폴더 : ", data.destination);
      console.log("destinatin에 저장된 파일 명 : ", data.filename);
      console.log("업로드된 파일의 전체 경로 ", data.path);
      console.log("파일의 바이트(byte 사이즈)", data.size);
    });
  }

  console.log("req.files:", req.files);
  console.log("req.body:", req.body);

  res.status(200).json({ success: true, message: "file upload success" });
}

router.post(
  "/upload",
  upload.fields([{ name: "file1", maxCount: 10 }]),
  async (req, res) => {
    try {
      const { file1 } = req.files;
      const feedbackId = parseInt(req.body.feedbackId, 10);
      const userId = parseInt(req.body.userId, 10);

      if (Number.isNaN(feedbackId)) {
        return res
          .status(400)
          .json({ success: false, message: "feedbackId는 숫자여야 합니다." });
      }

      if (!feedbackId || !file1 || file1.length < 1) {
        return res
          .status(400)
          .json({ success: false, message: "feedbackId와 파일이 필요합니다." });
      }

      const files = file1.map((f) => f.path);

      console.log(
        `업로드 완료: feedbackId=${feedbackId}, 파일 개수=${files.length}`
      );

      // Python API 호출
      const analysisResult = await callPythonAnalyze(feedbackId, files);
      console.log("분석 결과 : ", analysisResult);

      // 분석 결과 피드백 본문 수정 API를 사용해 수정
      const updateResult = await callUpdateFeedback(
        feedbackId,
        userId,
        analysisResult
      );

      return res.status(200).json({
        success: true,
        message: "파일 업로드 및 분석/DB 업데이트 성공",
        analysis: analysisResult,
        update: updateResult,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "업로드/분석 처리 중 오류 : ",
        error,
      });
    }
  }
);

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res
      .status(500)
      .json({ success: false, message: `Multer 오류: ${err}` });
  } else if (err instanceof Error) {
    return res
      .status(500)
      .json({ success: false, message: `파일 업로드 오류: ${err}` });
  }
  next();
});

module.exports = router;
