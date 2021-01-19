"use strict";

Hamburger.SIZE_SMALL = {
    price : 50,
    callories : 20
}

Hamburger.SIZE_MEDIUM = {
    price : 75,
    callories : 30
}

Hamburger.SIZE_BIG = {
    price : 100,
    callories : 40
}

Hamburger.TOPPING_CHESE = {
    price : 10,
    callories : 20
}

Hamburger.TOPPING_MAYO = {
    price : 20,
    callories : 5
}

Hamburger.TOPPING_SALAT = {
    price : 20,
    callories : 5
}

Hamburger.TOPPING_POTATO = {
    price : 15,
    callories : 10
}

Hamburger.TOPPING_SPICE = {
    price : 15,
    callories : 0
}

function Hamburger(size) {
    this.size = size;
    this.toppings = [];
}

Hamburger.prototype.addTopping = function(toppingType) {
    return this.toppings.push(toppingType);
}

Hamburger.prototype.getPrice = function() {
    return this.priceResult = this.size.price + this.toppings.reduce((acc, topping) => acc + topping.price, 0);
}

Hamburger.prototype.getCallories = function() {
    return this.calloriesResult = this.size.callories + this.size.price + this.toppings.reduce((acc, topping) => acc + topping.callories, 0);
}

const hamburger = new Hamburger(Hamburger.SIZE_SMALL);

hamburger.addTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);
hamburger.addTopping(Hamburger.TOPPING_POTATO);

console.log("Price with sauce:" + hamburger.getPrice());
console.log("Callories with sauce: " + hamburger.getCallories());

