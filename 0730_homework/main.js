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

console.log(func.filter(arr_1, (item) => { return item.price>=100 }));
// console.log(arr_1.filter((item) => { return item.price>=100 }));
// console.log(func.concat(arr_1,'abbbb', arr_2, obj, [[1,[2,3]]]));

// console.log(func.find(arr_1, (item) => { return item.price>=100 }));

// console.log(func.findIndex([], (item) => { return item.price>200 }));
// console.log([].findIndex((i)=>{return true}));

