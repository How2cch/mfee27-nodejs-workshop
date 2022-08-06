import fs from 'fs';
console.log('=== 使用 async function ===');

// 記得要放編碼 utf8
// callback
// readFile 去硬碟讀檔案，這是很慢的事，他是非同步
let readFile = (file, encoding) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, encoding, (err, data) => {
            if (err) {
              reject(err);
              return
            }
            resolve(data);
          });
    })
} 


async function greeting() {
    console.log(await readFile('greeting.txt', 'utf-8'));
}

greeting();