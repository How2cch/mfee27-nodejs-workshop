import fs from 'fs';
console.log('=== 一般讀取檔案 ===');

// 記得要放編碼 utf8
// callback
// readFile 去硬碟讀檔案，這是很慢的事，他是非同步
fs.readFile('greeting.txt', 'utf8', (err, data) => {
    if (err) {
        return console.error('發生錯誤', err);
    }
    console.log(data);
    return data;
});
