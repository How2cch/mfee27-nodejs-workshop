const { default: axios } = require('axios');
const moment = require('moment');
const fs = require('fs/promises');
const mysql = require('mysql2');
require('dotenv');

let stockArr = [];
let queryDate = moment().format('YYYYMMDD');

(async () => {
  let stockNo = await fs.readFile('stock.txt', 'utf-8');
  stockArr = stockNo.split(', ');

  let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: '',
    database: 'stock_mfee27',
  });
  let a = 0;
  for (const item of stockArr) {
    console.log(`a`, a);
    a++;
    try {
      let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
        params: {
          response: 'json',
          date: queryDate,
          stockNo: item,
        },
      });

      let queryNameResponse = await axios.get('https://www.twse.com.tw/zh/api/codeQuery', {
        params: {
          query: item,
        },
      });

      let suggestions = queryNameResponse.data.suggestions;
      let suggestion = suggestions[0];
      if (suggestion === '(無符合之代碼或名稱)') {
        console.error(suggestion);
        throw new Error(suggestion);
      }
      let stockName = suggestion.split('\t').pop();

      let saveNameResult = connection.execute('INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)', [item, stockName]);
      console.log(`saveNameResult`, saveNameResult);
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
