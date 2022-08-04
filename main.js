import * as func from './function.js';


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


// console.log(func.filter(arr_1, (item) => { return item.price < 200 }));
// console.log(arr_1.filter((item) => { return item.price < 200 })); 
// ? 原 filter 陣列方法


// console.log(func.concat(arr_1, 'abbbb', arr_2, obj, [[1,[2,3]]]));
// console.log(arr_1.concat('abbbb', arr_2, obj, [[1,[2,3]]]));
// ? 原 concat 陣列方法


// console.log(func.find(arr_1, (item) => { return item.price>=200 }));
// console.log(arr_1.find((item) => { return item.price>=200 }));
// ? 原 find 陣列方法


// console.log(func.findIndex(arr_1, (item) => { return item.price>200 }));
// console.log(arr_1.findIndex((i)=>{ return item.price>200 }));
// ? 原 findIndex 陣列方法


// console.log(func.map(arr_1, (item, index ,array) => { return item.price * 2 }))
// console.log(arr_1.map((item, index ,array) => { return item.price * 2 }));
// ? 原 map 陣列方法


// console.log(func.reduce(arr_1, (accumulator ,currentValue, currentIndex, array) => { return accumulator + currentValue.price }, 0));
// console.log(arr_1.reduce((accumulator ,currentValue, currentIndex, array) => { return accumulator + currentValue.price }, 0));
// ? 原 reduce 陣列方法

console.log('======= 這是實作 splice 方法 ======');
console.log('原始陣列：', arr_1_splice);
console.log('return ', func.splice(arr_1_splice, 1, 1, { id:'測試 id', type:'測試 type', price:'測試 price'}, 321, [1, [2, 3]]));
console.log('改動後陣列：', arr_1_splice);

console.log('----------------------------------------------');

console.log('======= 這是原 splice 方法 ======');
console.log('原始陣列：', arr_2_splice);
console.log('return ', arr_2_splice.splice(1, 1, { id:'測試 id', type:'測試 type', price:'測試 price'}, 321, [1, [2, 3]]));
console.log('改動後陣列：', arr_2_splice);
// ? 原 splice 陣列方法

