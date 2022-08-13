function splice(arr, start, deleteCount, ...addItems) {
    Array.isArray(arguments[0]) ? '' : error('第一項 argument 必須是 array 形式');
    start = isNaN(Number(start)) ? 0 : Number(start); // 將該參數轉為數字型別，若出現 NaN 則賦值為 0
    start = start < 0 ?  arr.length + start : start; // 如果起始索引是負數，則會從陣列中最後一個元素開始往前改動，這裡重新賦值為正確索引
    start = start < 0 ?  0 : start ; // 如果起始索引是負數，且超過陣列長度，則重新賦值為 0
    start = start > arr.length ?  arr.length : start; // 如果起始索引超過陣列長度，則重新賦值為陣列長度

    if (deleteCount == undefined) {
        let results = []
        let resultsIndex = 0;
        for (let index = start; index < arr.length-start; index++) {
            results[resultsIndex] = arr[index];
            resultsIndex++;
        }
        arr.length = start;
        return results;        
    }

    deleteCount = isNaN(Number(deleteCount)) ? 0 : Number(deleteCount); // 將該參數轉為數字型別，若出現 NaN 則賦值為 0
    deleteCount = deleteCount < 0 ?  0 : deleteCount; // 如果刪除數量是負數，則重新賦值為 0
    deleteCount = arr.length - start - deleteCount < 0 ?  arr.length - start : deleteCount; // 如果從起始索引算起的刪除數量超過陣列可以被刪除的數量，則重新賦值為可以被刪除的數量
    
    let finalLength = arr.length - deleteCount + addItems.length;
    let items_keep_1 = [];
    let items_delete = [];
    let items_keep_2 = [];
    let finalArr = [];
    let finalArrIndex = 0;

    for (let index = 0; index < start; index++) {
        items_keep_1[index] = arr[index]; 
        finalArr[finalArrIndex] = arr[index];
        finalArrIndex++;
    }

    for (const item of addItems) {
        finalArr[finalArrIndex] = item;
        finalArrIndex++;
    }
    
    for (let index = 0; index < deleteCount; index++) {
        items_delete[index] = arr[index + start];
    }

    for (let index = 0; index < arr.length - start - deleteCount; index++) {
        items_keep_2[index] = arr[index + start + deleteCount];
        finalArr[finalArrIndex] = arr[index + start + deleteCount];
        finalArrIndex++;
    }

    for (let index = 0; index < finalArr.length; index++) {
        arr[index] = finalArr[index];
    }

    arr.length = finalLength;

    return items_delete;
}
// ===== splice end =====



function error(text) {
    throw new Error(text);
}


let arr_1_splice = [
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

let arr_2_splice = [
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


console.log('======= 這是實作 splice 方法 ======');
console.log('原始陣列：', arr_1_splice);
console.log('return ', splice(arr_1_splice, 1, 1, { id:'測試 id', type:'測試 type', price:'測試 price'}, 321, [1, [2, 3]]));
console.log('改動後陣列：', arr_1_splice);

console.log('----------------------------------------------');

console.log('======= 這是原 splice 方法 ======');
console.log('原始陣列：', arr_2_splice);
console.log('return ', arr_2_splice.splice(1, 1, { id:'測試 id', type:'測試 type', price:'測試 price'}, 321, [1, [2, 3]]));
console.log('改動後陣列：', arr_2_splice);
// ? 原 splice 陣列方法
