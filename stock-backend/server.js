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
  let [result] = await pool.execute('SELECT * FROM stocks');
  res.json(result);
});

app.get('/api/1.0/stock-prices/:stockno', async (req, res) => {
  let [result] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=?', [req.params.stockno]);
  res.json(result);
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
