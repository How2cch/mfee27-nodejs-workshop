function reduce(arr, callback, initialValue) {
    Array.isArray(arguments[0]) ? '' : error('第一項 argument 必須是 array 形式');
    typeof callback == 'function' ? '' : error('第二項 argument 必須是 callback function');
    (initialValue == undefined && arr.length == 0)? error('array 為空時必須設置 initialValue') : '';

    if (initialValue == undefined){
        let accumulator = arr[0];
        for (let index = 1; index < arr.length; index++) {
            accumulator = callback(accumulator ,arr[index], index, arr);
        }
        return accumulator;
    } else {
        let accumulator = initialValue;
        for (let index = 0; index < arr.length; index++) {
            accumulator = callback(accumulator ,arr[index], index, arr);
        }
        return accumulator;
    }
}
// ===== reduce end =====



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

console.log('實作 reduce 方法');
console.log(reduce(arr_1, (accumulator ,currentValue, currentIndex, array) => { return accumulator + currentValue.price }, 0));
console.log('原 reduce 方法');
console.log(arr_1.reduce((accumulator ,currentValue, currentIndex, array) => { return accumulator + currentValue.price }, 0));
// ? 原 reduce 陣列方法