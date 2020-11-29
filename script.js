userOperand = function()
{
    const operand = prompt('Hello, what You would do with numbers?');
    return operand;
}()

const firstNumber = prompt('Please, set first number');
const secondNumber = prompt('Please, set second number');

switch(userOperand) {
    case '-' :
        console.log(`Your operation is: ${firstNumber} ${userOperand} ${secondNumber} = ${firstNumber - secondNumber}`);
        break;
    case '+' :
        console.log(`Your operation is: ${firstNumber} ${userOperand} ${secondNumber} = ${+firstNumber + +secondNumber}`);
        break;
    case '/' :
        console.log(`Your operation is: ${firstNumber} ${userOperand} ${secondNumber} = ${firstNumber / secondNumber}`);
        break;
    case '*' :
        console.log(`Your operation is: ${firstNumber} ${userOperand} ${secondNumber} = ${firstNumber * secondNumber}`);
        break;
    default :
        console.log('No acceptable operands!');
}