
console.log(getSumOfAllNumbersUpToThisNumber(3));

function getSumOfAllNumbersUpToThisNumber(number) {
    if (number === 1) {
        return number;
    }

    return getSumOfAllNumbersUpToThisNumber(number -1) + number;
}

