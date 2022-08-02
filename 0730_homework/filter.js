function filter(arr, callback) {
    Array.isArray(arguments[0]) ? '' : error('第一項 argument 必須是 array 形式');
    typeof callback == 'function' ? '' : error('第二項 argument 必須是 callback function');
    if (arr.length == 0) return [];    

    let results = [];
    let insertIndex = 0;
    for (const [index, item] of arr.entries()) {
        if (callback(item, index, arr)) {
            results[insertIndex] = item;
            insertIndex++;
        }
    }
    return results;
}
// ====== filter end ======



function error(text) {
    throw new Error(text);
}


let arr_1 = [
    {
        'id': 1,
        'type': 'a',
        'price': 100
    },
    {
        'id': 2,
        'type': 'b',
        'price': 100
    },
    {
        'id': 3,
        'type': 'a',
        'price': 200
    }
];

let arr_2 = ['1', '2', 3];

let obj = {
    'id': 4,
    'type': 'b',
    'price': 300
}

console.log('實作 filter 方法');
console.log(filter(arr_1, (item) => { return item.price < 200 }));
console.log('原 filter 方法');
console.log(arr_1.filter((item) => { return item.price < 200 })); 
// ? 原 filter 陣列方法