
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
    previousDisplayValue.textContent = `${previousOperand} ${currentOperator} ${currentOperand} =`;
    operate();
    currentDisplayValue.textContent = currentOperand;
    currentOperand = '';
})

// innerText
//textContent
// max 12 digits
let previousOperand = '' 
let currentOperand = '0'
let currentOperator = null;


// "5"
function appendNumber(number) {
    if (currentDisplayValue.textContent === '0') {
        currentOperand = number
       // currentDisplayValue.textContent = number;
    } else {
        currentOperand += number
      //  currentDisplayValue.textContent += number;
    }
}
    

/* 
    previousOperand = '' 
    currentOperand = '0'
    currentOperator = null;
*/

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

// 5 + 3 = 
// 8

// currentOperand = 8
// currentoperator = null
// previousOpereand = ''
/*


equalButton.addEventListener('click', () => {
    operate();
    updateDisplay();
})

 */

function updateDisplay() {
    currentDisplayValue.textContent = currentOperand;

    if (currentOperator === null) {
         previousDisplayValue.textContent = ''
    }
    else if (currentOperator !== null) {
        previousDisplayValue.textContent = `${previousOperand} ${currentOperator}`;
        
        
    } //else {
        //previousDisplayValue.textContent = `${previousOperand} ${currentOperator} ${currentOperand}`;
        // currentoperator = null  
    //currentDisplayValue.textContent = `${currentOperand}`
   // }
}


function clearCalculator() {
    previousOperand = '' 
    currentOperand = '0'
    currentOperator = null;
}




