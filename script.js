"use strict";

function Calculator(value) {
    this.value = value;
    this.get = function() { return this.value };
}

Calculator.prototype.add = function(number) {
    return this.value = +this.value + +number;
}

Calculator.prototype.div = function(number) {
    return this.value = +this.value / +number;
}

Calculator.prototype.mul = function(number) {
    return this.value = +this.value * +number;
}

Calculator.prototype.sub = function(number) {
    return this.value = +this.value - +number;
}

Calculator.prototype.set = function(number) {
    return this.value = +number;
}

const calc = new Calculator(10);

console.log(calc.add(5));
console.log(calc.div(5));
console.log(calc.mul(5));
console.log(calc.get(5));
console.log(calc.sub(5));