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
      let response = await axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY`, {
        params: {
          response: 'json',
          date: queryDate,
          stockNo: item,
        },
      });
      stockInfo[item] = response.data;
      console.log(`response`, response.data);

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
      console.log('stockName', stockName);
    } catch (e) {
      console.error(e);
    }

    await wait(2000);
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
