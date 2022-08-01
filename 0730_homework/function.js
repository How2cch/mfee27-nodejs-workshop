function filter(arr) {
    Array.isArray(arguments[0]) ? '' : error('argument 必須是陣列形式');

    let results = [];
    let insertIndex = 0;

    for (let item of arr) {
        if (item.type == 'a') {
            results[insertIndex] = item;
            insertIndex++;
        }
    }

    function error(text) {
        throw new Error(text);
    }

    return results;
}


function concat(...arr) {
    let results = [];
    let insertIndex = 0;

    for (let item of arr) {
        if (results.length == 0) {
            results = Array.isArray(item) ?  item:[item];
            insertIndex = results.length;
        } else if (Array.isArray(item)) {
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

function find(arr) {
    Array.isArray(arguments[0]) ? '' : error('argument 必須是陣列形式');

    for (let item of arr) {
        if (item.type == 'a') {
            return item;
        }
    }

    function error(text) {
        throw new Error(text);
    }
}



export {filter, concat, find};