
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
    updateDisplay();
})

equalButton.addEventListener('click', () => {
    if (currentOperator === null) return
    else {
        previousDisplayValue.textContent = `${previousOperand} ${currentOperator} ${currentOperand} =`;
        operate();
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
    console.log(console.log(currentOperand))
}
// innerText
//textContent
// max 12 digits
/*
    console.log(previousOperand)
    console.log(currentOperator)
    console.log(currentOperand)
*/
let previousOperand = '' 
let currentOperand = '0'
let currentOperator = null;


function appendNumber(number) {
    if (currentDisplayValue.textContent === '0') {
        currentOperand = number
    } else {
        currentOperand += number
    }
}

function appendOperator(operator) {

    if (currentOperand === '') return
    else if (previousOperand !== '') {
        operate();
    }
    currentOperator = operator;
    previousOperand = currentOperand;
    currentOperand = '';
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

function appendDecimal() {
    if (currentDisplayValue.textContent.includes('.')) return;
    else {
        currentOperand += '.' 
    }
    //updateDisplay()
}

function updateDisplay() {
    currentDisplayValue.textContent = currentOperand;

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
}




