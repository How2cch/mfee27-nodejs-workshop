const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const pool = require('../utils/db');

router.post('/register', async (req, res) => {
  // 確認資料有沒有收到
  // console.log('register', req.body); // ? 需要將輸出轉為 JSON，app.use(exprexx.josn())，這次已經加在 server.js API routers 前方
  // TODO: 搜尋是否有 email 重複
  let [members] = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);
  if (members.length !== 0) return res.status(400).json({ message: '這個 Email 已被註冊' });
  console.log('這個 email 可以註冊');

  // TODO: 驗證密碼兩次相同
  if (req.body.password !== req.body.confirmPassword) return res.status(400).json({ message: '兩次密碼輸入不相同' });
  console.log('確定兩次密碼輸入相同');

  // TODO: 將密碼雜湊
  let hashPassword = await bcrypt.hash(req.body.password, 10);
  console.log('雜湊密碼', hashPassword);

  // TODO: 寫入資料庫並回覆前端
  try {
    let result = await pool.execute('INSERT INTO members (email, name, password) VALUE (?, ?, ?)', [req.body.email, req.body.name, hashPassword]);
    console.log('insert new member', result);
    console.log('這個 user 的 id 是', result[0].insertId);
    res.json({ status: 'ok', message: '註冊成功' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: '這個 Email 已被註冊' });
    console.log();
  }
});

module.exports = router;
