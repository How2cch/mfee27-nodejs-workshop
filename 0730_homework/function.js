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


function error(text) {
    throw new Error(text);
}

export {filter, concat, find ,findIndex, map, reduce};