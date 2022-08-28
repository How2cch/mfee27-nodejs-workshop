const express = require('express');
const app = express();
require('dotenv').config();
const mysql = require('mysql2');
const cors = require('cors');

const corsConfig = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsConfig));

const port = process.env.SERVER_PORT;
const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // ? 限制 pool 連線上限
    connectionLimit: 10,
    // ? date 不要轉成 date Object
    dateStrings: true,
  })
  .promise();

// todo: 設定視圖引擎，目前使用 pug
app.set('view engine', 'pug');
// todo: 告訴 express 視圖在哪裡
app.set('views', 'views');
// todo: 測試 Server Side Render 的寫法
app.get('/ssr', (req, res) => {
  res.render('index', {
    stocks: ['台積電', '長榮', '鴻海', '聯發科'],
    stockNo: ['2330', '2603', '2317', '2454'],
  });
});

app.use((req, res, next) => {
  console.log('這是第一個 middleware');
  next();
});

app.use((req, res, next) => {
  console.log('這是第二個 middleware');
  next();
});

app.get('/', (req, res) => {
  console.log('這是首頁');
  res.send('Home page');
});

app.get('/about', (req, res) => {
  console.log('這是關於我');
  res.send('About page');
});

// todo: API
app.get('/api/1.0/stock', async (req, res) => {
  let [data] = await pool.execute('SELECT * FROM stocks');
  res.json(data);
});

app.get('/api/1.0/stock-prices/:stockno', async (req, res) => {
  let dataShowType = req.query.type || 'page';
  if (dataShowType === 'date') {
    let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date', [req.params.stockno]);
    res.json(data);
    return;
  }
  let [total] = await pool.execute('SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?', [req.params.stockno]);
  let currentPage = req.query.page || 1;
  const perPage = 5;
  total = total[0].total;
  const offset = perPage * (currentPage - 1);
  const lastPage = Math.ceil(total / perPage);
  let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date LIMIT ?  OFFSET ?', [req.params.stockno, perPage, offset]);

  res.json({ total, perPage, currentPage, lastPage, data });
});

app.use((req, res) => {
  console.log('這個頁面找不到');
  res.status(404).send('Not Found 啦');
});

app.use(() => {
  console.log('這是第三個 middleware');
});

app.listen(port, () => {
  console.log(`Server start at ${port}`);
});
