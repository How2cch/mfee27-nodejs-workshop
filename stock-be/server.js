const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.SERVER_PORT;

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
