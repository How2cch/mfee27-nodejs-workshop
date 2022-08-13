let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

// 試寫 Promise

function doWork2(job, timer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let dt = new Date();
            if (job == undefined || timer == undefined) {
                reject(`出事了阿貝`);
            } else {
                resolve(`完成工作 ${job} at ${dt.toISOString()}`);
            }
        }, timer);
    });
}

doWork2('刷牙', 3000)
    .then((data) => {
        console.log(data);
        return doWork2('吃早餐', 5000);
    })
    .then((data) => {
        console.log(data);
        return doWork2('寫功課', 3000);
    })
    .then((data) => {
        console.log(data);
        return doWork2();
    })
    .catch((err) => {
        console.log(err);
    });
