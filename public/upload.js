const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const sambaPath = path.join(__dirname, 'shared');

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
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        callback(null, true);
    } else {
        console.log('허용되지 않는 확장자입니다', file.mimetype);
        callback(new Error('허용되지 않는 확장자입니다.'));
    }
};

const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter,
});

function handleFile(req, res) {
    const { file1 } = req.files;
    const { name } = req.body;

    console.log('body 데이터: ', name);
    if (file1) {
        file1.forEach((data) => {
            console.log('file1');
            console.log('폼에 정의된 필드명 : ', data.fieldname);
            console.log('사용자가 업로드한 파일 명 : ', data.originalname);
            console.log('파일의 엔코딩 타입 : ', data.encoding);
            console.log('파일의 Mime 타입 : ', data.mimetype);
            console.log('파일이 저장된 폴더 : ', data.destination);
            console.log('destinatin에 저장된 파일 명 : ', data.filename);
            console.log('업로드된 파일의 전체 경로 ', data.path);
            console.log('파일의 바이트(byte 사이즈)', data.size);
        });
    }

    console.log('req.files:', req.files);
    console.log('req.body:', req.body);

    res.status(200).json({ success: true, message: 'file upload success' });
}

router.post('/upload', upload.fields([{ name: 'file1', maxCount: 10 }]), handleFile);

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(500).json({ success: false, message: `Multer 오류: ${err}` });
    } else if (err instanceof Error) {
        return res.status(500).json({ success: false, message: `파일 업로드 오류: ${err}` });
    }
    next();
});

module.exports = router;
