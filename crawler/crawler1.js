const { default: axios } = require('axios');
const moment = require('moment');
const fs = require('fs/promises');

let stockArr = [];
let queryDate = moment().format('YYYYMMDD');
let stockInfo = {};

(async () => {
  let stockNo = await fs.readFile('stock.txt', 'utf-8');
  stockArr = stockNo.split(', ');
  for (const item of stockArr) {
    let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${queryDate}&stockNo=${item}`);
    stockInfo[item] = response.data;
    console.log(stockInfo[item]);
    await wait(3000);
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
