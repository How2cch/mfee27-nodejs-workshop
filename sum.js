let sum = (num) => {
    // 1 + 2 + 3 +..... + n
    let result = 0;
    for(let i = 1; i <= num; i++){
        result += i;
    }
    console.log(result);
    return result;
};

sum(100);