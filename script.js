
const calculator = createCalculator(200);

console.log(calculator.sum(50)); // 250
console.log(calculator.mult(60)); // 12000
console.log(calculator.sub(70)); // 130
console.log(calculator.div(4)); // 50
console.log(calculator.set(100)); // 100

// ======= try validation =======

console.log(calculator.sum(undefined)); // 200
console.log(calculator.mult('test')); // 0
console.log(calculator.sub('88')); // 200
console.log(calculator.div(NaN)); // Infinity
console.log(calculator.set(true)); // true

function createCalculator(num) {
    let number = validateNumber(num);
    return {
        sum : (n) => number + validateNumber(n),
        mult: (n) => number * validateNumber(n),
        sub : (n) => number - validateNumber(n),
        div : (n) => number / validateNumber(n),
        set : (n) => number = n,
    }
}

function validateNumber(number) {
    return !isNaN(number) && typeof Number(number) ? number : null; 
}