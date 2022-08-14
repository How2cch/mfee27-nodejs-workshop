const { default: axios } = require('axios');
// const moment = require('moment');
const fs = require('fs/promises');

let stockArr = [];
// let queryDate = moment().format('YYYYMMDD');
let stockInfo = {};

(async () => {
  let stockNo = await fs.readFile('stock.txt', 'utf-8');
  stockArr = stockNo.split(', ');

  for (const item of stockArr) {
    try {
      let response = await axios.get(`https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_${item}.tw&json=1&delay=0`);
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
