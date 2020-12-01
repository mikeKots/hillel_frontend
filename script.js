const operation = getOperation();

const firstOperand = getOperand('First Operand');
const secondOperand = getOperand('Second Operand');

const result = calculate(operation, firstOperand, secondOperand);

showResult(operation, firstOperand, secondOperand, result);

function getOperation(){
    let operation = prompt('What to do?', 'Like + or -');
    while (operation != '-' && operation != '+' && operation != '/' && operation != '*') {
        operation = prompt('Please set correct operation');
    }
    return operation;
}

function getOperand(operandName){
    let operand = Number(prompt('Operand' + operandName));
    while(isNaN(operand)) {
        operand = Number(prompt('Please set Number'));
    }
    return operand;
}

function calculate(operation, firstOperand, secondOperand){
    let result;
    switch (operation) {
        case "+" : result = firstOperand + secondOperand; break;
        case "-" : result = firstOperand - secondOperand; break;
        case "/" : result = firstOperand / secondOperand; break;
        case "*" : result = firstOperand * secondOperand; break;
        default : result = 'unknown'
    }
    return result;
}

function showResult(operation, firstOperand, secondOperand, result){
    console.log(`${firstOperand} ${operation} ${secondOperand} = ${result}`);
    alert(`${firstOperand} ${operation} ${secondOperand} = ${result}`);
}
