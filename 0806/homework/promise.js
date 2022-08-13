import fs from 'fs';
console.log('=== 使用 Promise.then() ===');

// 記得要放編碼 utf8
// callback
// readFile 去硬碟讀檔案，這是很慢的事，他是非同步
let readFile = (file, encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, encoding, (err, data) => {
            if (err) {
                return reject(err);
            }
            return resolve(data);
        });
    });
};

readFile('greeting.txt', 'utf-8')
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error(error);
    });