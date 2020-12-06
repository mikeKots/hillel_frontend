
const VALID_OPERATORS = ['-', '+', '/', '*'];

const operation = getOperation();

const howManyOperands = numberOfOperands();

const finalResult = getFinalResult();

showResult(finalResult);


function getCalculationString(number, result, calculationString, index, operandsArray){
    if (index != operandsArray.length -1){
       return calculationString += `${number} ${operation} `
    };  
    return calculationString += `${number} = ${result}`;
}

function getResult(operation, result, number, index){
    if (index > 0) {
        return calculate(operation, result, number);
    }
    return number;
}

function getOperation(){
    let operation = prompt('What to do?', 'Like + or -');
    while (!isOperatorValid(operation)) {
        operation = prompt('Please set correct operation');
    }
    return operation;
}

function getOperand(operandName){
    let operand = Number(prompt('Set ' + operandName));
    while(!isOperandValid(operand)) {
        operand = Number(prompt('Please set Number'));
    }
    return operand;
}

function numberOfOperands(){
    let operandNumber = Number(prompt('How many Operands You want?'));
    while(isNumberOperandsValid(operandNumber)) {
        operandNumber = Number(prompt('Please set correct number of operands (more than 2 and less than 5)'));
    }
    return operandNumber;
}

function isOperandValid(operand){
    return !isNaN(operand) && operand > 0;
}

function isOperatorValid(operation){
    return VALID_OPERATORS.includes(operation);
}

function isNumberOperandsValid(operandNumber){
    return !isOperandValid(operandNumber) || !(operandNumber >= 2 && operandNumber <= 5)
}

function getFinalResult(){
    const operandsArray = new Array(howManyOperands).fill();
    let result = 0;
    let calculationString = '';
    operandsArray.forEach((_, index) => {
        let number = getOperand('Operand ' + (index +1));
        result = getResult(operation, result, number, index);
        calculationString = getCalculationString(number, result, calculationString, index, operandsArray);
    });
    return calculationString;
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

function showResult(calculationString){
    console.log(calculationString);
    alert(calculationString);
}
