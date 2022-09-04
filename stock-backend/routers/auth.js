const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const pool = require('../utils/db');
const path = require('path');
const multer = require('multer');

const registerRules = [
  body('email').isEmail().withMessage('Email 欄位格式錯誤'),
  body('password').isLength({ min: 8 }).withMessage('密碼長度需要至少為 8'),
  body('confirmPassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('兩次密碼輸入不一致'),
];

const loginRules = [body('email').isEmail().withMessage('Email 欄位格式錯誤'), body('password').isLength({ min: 8 }).withMessage('密碼長度需要至少為 8')];

// TODO: 圖片上傳器製作
// 自定義存儲設定
const storage = multer.diskStorage({
  // 存儲目的地
  destination: function (req, file, callback) {
    // ? callback 第一個參數為錯誤時的執行，但目前只是在設定存儲路徑，不會用到，所以設為 null
    callback(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  // 檔案名稱
  filename: function (req, file, callback) {
    console.log('file', file);
    // ? 找出副檔名
    const ext = file.originalname.split('.').pop();
    // ? 設定即將被存進去的圖片檔名
    callback(null, `member-${Date.now()}.${ext}`);
  },
});

// 上傳器主體
const uploader = multer({
  // 選擇存儲的設定
  storage: storage,
  // 過濾圖片的種類，目前只接受下列三種
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png') {
      // ? 圖片無法通過過濾時的處理
      cb(new Error('只接受 jpeg、jpg，png 的圖片檔案'), false);
    } else {
      // ? 圖片過濾沒問題
      cb(null, true);
    }
  },
  // 過濾檔案的大小
  limits: {
    // ? 單位為 byte
    fileSize: 200 * 1024,
  },
});

router.post('/register', uploader.single('photo'), registerRules, async (req, res) => {
  try {
    console.log('====== req ======');
    console.log('req.body', req.body);
    console.log('req.file', req.file);

    // TODO: 將 req 套用上方設置好的資料規則驗證
    // console.log('---------------------', body('email').isEmail());
    const validateResult = validationResult(req);
    console.log('validateResult', validateResult);

    // TODO: 確認有無通過所有驗證，如果沒有則返回目前錯誤項目給前端
    if (!validateResult.isEmpty()) return res.status(400).json({ error: validateResult.array() });

    // 確認資料有沒有收到
    // console.log('register', req.body); // ? 需要將輸出轉為 JSON，app.use(exprexx.josn())，這次已經加在 server.js API routers 前方

    // TODO: 搜尋是否有 email 重複
    let [member] = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);
    console.log(member);
    if (member.length !== 0) return res.status(400).json({ message: '這個 Email 已被註冊' });
    console.log('這個 email 可以註冊');
    console.log(req.body.password);
    console.log(req.body.confirmPassword);
    // TODO: 驗證密碼兩次相同
    if (req.body.password !== req.body.confirmPassword) return res.status(400).json({ message: '兩次密碼輸入不相同' });
    console.log('確定兩次密碼輸入相同');

    // TODO: 將密碼雜湊
    let hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log('雜湊密碼', hashPassword);

    // TODO: 製作出圖片路徑
    let filePath = req.file ? '/uploads/' + req.file.filename : '';
    console.log('圖片路徑', filePath);

    // TODO: 寫入資料庫並回覆前端
    let result = await pool.execute('INSERT INTO members (email, name, password, photo) VALUE (?, ?, ?, ?)', [req.body.email, req.body.name, hashPassword, filePath]);
    console.log('insert new member', result);
    console.log('這個 user 的 id 是', result[0].insertId);
    res.json({ status: 'ok', message: '註冊成功' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: '這個 Email 已被註冊' });
    console.log();
  }
});

router.post('/login', loginRules, async (req, res) => {
  try {
    // TODO: 將 req 套用上方設置好的資料規則驗證
    const validateResult = validationResult(req);
    console.log('validateResult', validateResult);
    console.log('req.body', req.body);

    // TODO: 確認有無通過所有驗證，如果沒有則返回目前錯誤項目給前端
    // ! 需要注意在登入場景下若登入失敗不需要告知用戶過多細節
    if (!validateResult.isEmpty()) return res.status(401).json({ message: '帳號或密碼錯誤' });

    // TODO: 搜尋是否有匹配的資料
    let [member] = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);
    console.log(member);
    if (member.length == 0) return res.status(401).json({ message: '帳號或密碼錯誤' });

    member = member[0];
    // TODO: 比較密碼是否正確
    let checkPassword = await bcrypt.compare(req.body.password, member.password);
    if (!checkPassword) return res.status(401).json({ message: '帳號或密碼錯誤' });

    const loginUser = {
      id: member.id,
      name: member.name,
      email: member.email,
      photo: member.photo,
    };
    req.session.member = loginUser;

    res.json({ message: '登入成功', user: loginUser });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
