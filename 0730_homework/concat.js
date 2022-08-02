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

console.log('實作 concat 方法');
console.log(concat(arr_1, 'abbbb', arr_2, obj, [[1,[2,3]]]));
console.log('原 concat 方法');
console.log(arr_1.concat('abbbb', arr_2, obj, [[1,[2,3]]]));
// ? 原 concat 陣列方法