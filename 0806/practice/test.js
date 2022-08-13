console.log('查看陣列的型態：', typeof [1, 2, 3]);
function Case() {
    this.text = 1
};
console.log('看函式建構物件的型態：', typeof new Case());
let a = new Array;
console.log('看看目前 a 是什麼：', a);
let b = new Array;
a[0] = 1;
b[0] = 1;
console.log('a 跟 b 一樣嗎？', a === b);
console.log('a 跟 b 裡面的值一樣嗎？', a[0] === b[0]);