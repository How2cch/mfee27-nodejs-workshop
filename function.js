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



function concat(...arr) {
    let results = [];
    let insertIndex = 0;
    for (let item of arr) {
        if (Array.isArray(item)) {
            for (let i of item) {
                results[insertIndex] = i;
                insertIndex++;
            }
        } else {
            results[insertIndex] = item;
            insertIndex++;
        }
    }
    return results;
}
// ====== concat end ======



function find(arr, callback) {
    Array.isArray(arguments[0]) ? '' : error('第一項 argument 必須是 array 形式');
    typeof callback == 'function' ? '' : error('第二項 argument 必須是 callback function');
    if (arr.length == 0) return ;

    for (const [index, item] of arr.entries()) {
        if (callback(item, index, arr)) {
            return item;
        } else if (index == arr.length-1) {
            return 
        }
    }
}
// ====== find end ======



function findIndex(arr, callback) {
        Array.isArray(arguments[0]) ? '' : error('第一項 argument 必須是 array 形式');
        typeof callback == 'function' ? '' : error('第二項 argument 必須是 callback function');
        if (arr.length == 0) return -1;

        for (const [index, item] of arr.entries()){
            if (callback(item)){
                return index;
            } else if (index == arr.length-1) {
                return -1;
            }
        }
}
// ===== findIndex end =====


function map(arr, callback) {
    Array.isArray(arguments[0]) ? '' : error('第一項 argument 必須是 array 形式');
    typeof callback == 'function' ? '' : error('第二項 argument 必須是 callback function');
    if (arr.length == 0) return [];

    let results = [];
    let insertIndex = 0;
    for (const [index, item] of arr.entries()) {
        results[insertIndex] = callback(item, index, arr);
        insertIndex++;
    }
    return results;
}
// ===== map end =====


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

    return items_delete;
}
// ===== splice end =====


function error(text) {
    throw new Error(text);
}

export {filter, concat, find ,findIndex, map, reduce, splice};