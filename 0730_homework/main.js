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


// console.log(arr_1);

