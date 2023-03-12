
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('.equal');
const percentButton = document.querySelector('.percent');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const backspaceButton = document.querySelector('.backspace');
const previousDisplayValue = document.querySelector('#previous-operation-display-screen');
const currentDisplayValue = document.querySelector('#current-operation-display-screen');


numberButtons.forEach(button =>
    button.addEventListener('click', event => {
        const numberClicked = event.target.dataset.number; // "5"
        appendNumber(numberClicked);
        updateDisplay()
}));

operatorButtons.forEach(button =>
    button.addEventListener('click', event => {
        const operatorClicked = event.target.dataset.operator;
        appendOperator(operatorClicked);
        updateDisplay()

}));

clearButton.addEventListener('click', () => {
    clearCalculator();
})

equalButton.addEventListener('click', () => {
    if (currentOperator === null) return
    else {
        previousDisplayValue.textContent = `${previousOperand} ${currentOperator} ${currentOperand} =`;
        operate();
        roundOffComputedValue(currentOperand);
        currentDisplayValue.textContent = currentOperand;
        currentOperand = '';
    }
})

decimalButton.addEventListener('click', () => {
    appendDecimal();
    updateDisplay();
})

percentButton.addEventListener('click', () => {
    convertPercentToDecimal();
        updateDisplay();
})

function convertPercentToDecimal() {
    currentOperand = parseFloat(currentOperand)/100
}
// innerText
//textContent
// max 12 digits
/*
    console.log(previousOperand)
    console.log(currentOperator)
    console.log(currentOperand)
*/
let previousOperand = ''; 
let currentOperand = '0';
let currentOperator = null;
const maxDisplayCharacterLength = 12;
const maxDecimalPlaces = 6;


function appendNumber(number) {
    if (currentDisplayValue.textContent === '0') {
        currentOperand = number
    } else if (currentDisplayValue.textContent.length < maxDisplayCharacterLength) {
        currentOperand += number
    }
}

function appendOperator(operator) {

    if (currentOperand === '') return
    else if (previousOperand !== '') {
        operate();
        roundOffComputedValue(currentOperand);
    }
    currentOperator = operator;
    previousOperand = currentOperand;
    currentOperand = '';
}

function appendDecimal() {
    if (currentDisplayValue.textContent.includes('.')) return;
    else if (currentDisplayValue.textContent === '0' || currentDisplayValue.textContent === '') {
        currentOperand = 0;    
        currentOperand += '.';
    }
    else {
        currentOperand += '.' 
    }
}


function operate() {

    let computedValue;
    const currentNum = parseFloat(currentOperand);
    const previousNum = parseFloat(previousOperand);

    switch (currentOperator) {
        case '+':
            computedValue = previousNum + currentNum;
            break;
        case '−':
            computedValue = previousNum - currentNum;
            break;
        case '×':
            computedValue = previousNum * currentNum;
            break;
        case '÷':
            if (currentNum === 0) {
                // currentDisplayValue.textContent = 'Cannot divide by zero'
                alert('Cannot divide by zero')
                return
            } else {
                computedValue = previousNum / currentNum;
            }
            break;
        default:
            return null;
    }
    currentOperand = computedValue;
    currentOperator = null;
    previousOperand = '';

}


function updateDisplay() {
    
    currentDisplayValue.textContent = currentOperand   
    
    if (currentDisplayValue.textContent.length < maxDisplayCharacterLength) {
        currentDisplayValue.textContent = currentOperand        
    }
    
    if (currentOperator === null) {
         previousDisplayValue.textContent = ''
    }
    else if (currentOperator !== null) {
        previousDisplayValue.textContent = `${previousOperand} ${currentOperator}`;   
    }
}


function clearCalculator() {
    previousOperand = '' 
    currentOperand = '0'
    currentOperator = null;

    previousDisplayValue.textContent = ''
    currentDisplayValue.textContent = currentOperand;
}





/*
TESTING

const computedValue = 1285903715
const maxDecimalPlaces = 6
const maxDisplayCharacterLength = 12
*/

function roundOffAccurately(num, decimalPlaces) {
    let roundedValue = parseFloat(Math.round (num +'e'+ decimalPlaces) +'e-'+ decimalPlaces);
    currentOperand = roundedValue;
    return currentOperand;
}

function convertToExponentialNotation(num, decimalPlaces) {
    let roundedValue = num.toExponential(decimalPlaces)
    currentOperand = roundedValue;
    return currentOperand;
}

console.log(`computed value: ${currentOperand}`)
console.log(`computed value string length: ${currentOperand.toString().length}`)



// 
function roundOffComputedValue(num) {
    /* Function that rounds off the computed value based on whether the value is an integer or a decimal number
        - Round off values to prevent screen overflow of the calculator when computed number is too big
        - Two ways of displaying rounded values for values to display nicely in the calculator 
            - roundOffAccurately function
            - convertToExponentialNotation function
        -  The maxDisplayCharacterLength, maxDecimalPlaces are chosen to fit according to the existing screen display of the calculator. Alter or change these values as needed
        - Use the roundOffAccurately function... 
            - when the integer is <= maxDisplayCharacterLength 
            - when the decimal value is <= maxDecimalPlaces
        - Use the convertToExponentialNotation function...
            - when the integer is > maxDisplayCharacterLength 
            - when the decimal value is > maxDecimalPlaces
    */
    
     // Check if computed value is written in exponential notation 
    if (num.toString().includes('e')) {
        // Limit the decimal places of the number in exponential notation
        return convertToExponentialNotation(num, maxDecimalPlaces)
    }
    
    // Check if number is a float (decimal) or integer
    
    // Check if number is an integer 
    if (Number.isInteger(num)) {
        // Check if integer has less than or equal to 12 characters
        if (num.toString().length <= maxDisplayCharacterLength) {
            console.log('integer, <= 12, roundOffAccurately')
            return roundOffAccurately(num, maxDecimalPlaces)
        } else { 
            console.log('integer, >12, convertToExponentialNotation')
            return convertToExponentialNotation(num, maxDecimalPlaces)
        }
    }
    // Check if  number is a float or decimal
    if (!Number.isInteger(num)) {
        
        // Get the numbers before the decimal point
        let splitNumArray = num.toString().split('.');
        let beforeDecimalNum = splitNumArray[0]
        
        // Check if the number of digits before the decimal point is less than or equal to 6
        if (beforeDecimalNum.length <= maxDecimalPlaces) {
            console.log('decimal, <=6, roundOffAccurately')
            return roundOffAccurately(num, maxDecimalPlaces)
        }
        else {
           console.log('decimal, >6, convertToExponentialNotation')
           return convertToExponentialNotation(num, maxDecimalPlaces)
        }
    }
}
console.log('----------------------')
console.log('Result: ')
console.log(roundOffComputedValue(currentOperand))
