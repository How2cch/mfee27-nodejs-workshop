const express = require('express');
const router = express();

const pool = require('../utils/db');

router.post('/register', (req, res) => {
  // 確認資料有沒有收到
  console.log('register', req.body); // ? 需要將輸出轉為 JSON，app.use(exprexx.josn())，這次已經加在 server.js API routers 管理前方
  res.json({});
});

module.exports = router;
