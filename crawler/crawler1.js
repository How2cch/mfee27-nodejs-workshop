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
    try {
      let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${queryDate}&stockNo=${item}`);
      stockInfo[item] = response.data;
    } catch (e) {
      console.error(e);
    }

    console.log(stockInfo[item]);
    await wait(2000);
  }

  let fileInfo = JSON.stringify(stockInfo);
  fs.writeFile('stockInfo.json', fileInfo);
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
