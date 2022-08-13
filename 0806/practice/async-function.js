
let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

// 試寫 async function

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
};

async function myWork() {
    try {
        let brush = await doWork2('刷牙', 3000);
        console.log(brush);
        let eat = await doWork2('吃早餐', 3000);
        console.log(eat);
        let homework = await doWork2('寫作業', 3000);
        console.log(homework);
        let empty = await doWork2();
        console.log(empty);
    } catch (error) {
        console.log(error);
    }

}

myWork();