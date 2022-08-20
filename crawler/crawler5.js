const { default: axios } = require('axios');
const moment = require('moment');
const fs = require('fs/promises');
const mysql = require('mysql2');
require('dotenv').config();

let stockArr = [];
let queryDate = moment().format('YYYYMMDD');

(async () => {
  let stockNo = await fs.readFile('./stock.txt', 'utf-8');
  stockArr = stockNo.split(', ');

  let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  for (const stockItem of stockArr) {
    try {
      // todo: 獲取 StockName ================================

      let queryNameResponse = await axios.get('https://www.twse.com.tw/zh/api/codeQuery', {
        params: {
          query: stockItem,
        },
      });

      let suggestions = queryNameResponse.data.suggestions;
      let suggestion = suggestions[0];
      if (suggestion === '(無符合之代碼或名稱)') {
        console.error(suggestion);
        throw new Error(suggestion);
      }
      let stockName = suggestion.split('\t').pop();

      connection.execute('INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)', [stockItem, stockName]);
      // console.log(`saveNameResult`, saveNameResult);

      // todo: 獲取 StockData ================================

      let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
        params: {
          response: 'json',
          date: queryDate,
          stockNo: stockItem,
        },
      });

      let data = response.data.data.map((d) => {
        d = d.map((value) => {
          return value.replace(/,/g, '');
        });
        d[0] = parseInt(d[0].replace(/\//g, ''), 10) + 19110000;
        d.unshift(stockItem);
        return d;
      });

      let savePriceResult = await connection
        .promise()
        .query('INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?', [data]);
      console.log(savePriceResult);
    } catch (e) {
      console.error(e);
    }

    await wait(2000);
  }

  if (connection) {
    connection.end();
    console.log('Connect closed');
  }
})();

// 延遲請求用
function wait(ms) {
  return new Promise((resolve) => {
    console.log('wating delay ...');
    setTimeout(() => {
      console.log('Done waiting');
      resolve(ms);
    }, ms);
  });
}
