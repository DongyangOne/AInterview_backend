const basicModel = require('../models/basicModel');

exports.checkDbConnection = async (req, res) => {
  try {
    const result = await basicModel.testQuery();
    res.status(200).json({
      message: '✅ 서버 및 DB 연결 성공!',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      message: '❌ 서버 또는 DB 연결 실패',
      error: error.message
    });
  }
};