const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const port = process.env.SERVER_PORT || 3001; // ? 給定一個預設的 port

const corsConfig = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsConfig));

// ====== pug template practice ======

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
// ====== End ======

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
const stockAPI = require('./routers/stock');
app.use('/api/1.0/stock', stockAPI);

// todo: 404 Not Found
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
