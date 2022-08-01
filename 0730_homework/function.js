function filter(arr, callback) {
    Array.isArray(arguments[0]) ? '' : error('第一項 argument 必須是 array 形式');
    typeof callback == 'function' ? '' : error('第二項 argument 必須是 callback function');
    if (arr.length == 0) return -1;    let results = [];

    let insertIndex = 0;
    for (let [index, item] of arr.entries()) {
        if (item.type == 'a') {
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
    if (arr.length == 0) return -1;

    for (let [index, item] of arr.entries()) {
        if (callback(item)) {
            return item;
        } else if (index == arr.length-1) {
            return -1
        }
    }
}
// ====== find end ======



function findIndex(arr, callback) {
        Array.isArray(arguments[0]) ? '' : error('第一項 argument 必須是 array 形式');
        typeof callback == 'function' ? '' : error('第二項 argument 必須是 callback function');
        if (arr.length == 0) return -1;

        for (let [index, item] of arr.entries()){
            if (callback(item)){
                return index;
            } else if (index == arr.length-1) {
                return -1;
            }
        }
}
// ===== findIndex end =====



function error(text) {
    throw new Error(text);
}

export {filter, concat, find ,findIndex};