const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('.equal');
const percentButton = document.querySelector('.percent');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const backspaceButton = document.querySelector('.backspace');
const previousDisplayValue = document.querySelector('#previous-operation-display-screen');
const currentDisplayValue = document.querySelector('#current-operation-display-screen');

// Initialize starting values for operands and operator
let previousOperand = ''; 
let currentOperand = '0';
let currentOperator = null;

// Set specific values for preventing screen overflow 
const maxDisplayCharacterLength = 12;
const maxDecimalPlaces = 6;

window.addEventListener('keydown', event => {   
    supportKeyBoardInput(event)}) 

numberButtons.forEach(button =>
    button.addEventListener('click', event => {
        const numberClicked = event.target.dataset.number;   // Get the value from data-number attribute in html file
        appendNumber(numberClicked);
        updateDisplay();
}));

operatorButtons.forEach(button =>
    button.addEventListener('click', event => {
        const operatorClicked = event.target.dataset.operator;  // Get the vale from data-operator attribute in the html file
        appendOperator(operatorClicked);
        updateDisplay();
}))

clearButton.addEventListener('click', () => {
    clearCalculator();
})

equalButton.addEventListener('click', () => {
    if (currentOperator === null || currentOperand.length === 0) return; // Prevent NaN from displaying on the screen when '=' is clicked but missed clicking other parts of the operation (no operator or number clicked)
    else {
        previousDisplayValue.textContent = `${previousOperand} ${currentOperator} ${currentOperand} =`;    // Update smaller display text (previously clicked values)  Ex. 5 + 10 =
        operate();
        if (currentOperand !== undefined) {
            roundOffComputedValue(currentOperand);
            currentDisplayValue.textContent = currentOperand;    // Update bigger display text to show currentOperand (computedValue)
            currentOperand = '';                                 // Reset currentOperand value 
        }
        else {
              currentOperand = 0;
        }
       
    }
})

decimalButton.addEventListener('click', () => {
    appendDecimal();
    updateDisplay();
})

percentButton.addEventListener('click', () => { 
    if (currentOperand.length === 0) return;  // Prevent NaN from displaying on the screen when '%' is clicked before pressing a number
    convertPercentToDecimal();
    updateDisplay();
})

backspaceButton.addEventListener('click', () => {
        currentOperand = currentDisplayValue.textContent.slice(0, -1);  // Deletes the last number from the currentOperand
        currentDisplayValue.textContent = currentOperand;               // Update display after deleting the last number from currentOperand
        if (currentOperand.length === 0) {
            currentDisplayValue.textContent = 0;                        // Display 0 when all the numbers from the currentOperand is deleted
        }
})

function convertPercentToDecimal() {
    currentOperand = parseFloat(currentOperand) / 100;
}

function appendNumber(number) {
    if (currentDisplayValue.textContent === '0') {
        currentOperand = number;  // Changes the zero in the currentDisplay to the current number clicked or pressed
    } else if (currentDisplayValue.textContent.length < maxDisplayCharacterLength) {  // Prevent screen overflow by using maxDisplayCharacterLength as a limit
        currentOperand += number;  // Adds currently pressed number to currentOperand string
    }
}

function appendOperator(operator) {
    if (currentOperand === '') return;   
    else if (previousOperand !== '') {
        operate();
        if (currentOperand !== undefined) { // Round off the currentOperand (computedValue) if currentOperand is NOT undefined
            roundOffComputedValue(currentOperand);
        }
        else {
            return clearCalculator();  // Clears calculator if currentOperand is undefined (when a user attempts to divide by zero)
        }
    }
    // Update operands and operator value
    currentOperator = operator;
    previousOperand = currentOperand;
    currentOperand = '';
}

function appendDecimal() {
    if (currentDisplayValue.textContent.includes('.')) return; // Prevents having more than one decimal point in the currentOperand value
    else if (currentDisplayValue.textContent === '0' || currentDisplayValue.textContent === '') {  // Adds a leading zero before the decimal point (Ex: '0.5')
        currentOperand = 0;    
        currentOperand += '.';
    }
    else {   // Adds a decimal point if the currentOperand value does not already contain a decimal point
        currentOperand += '.'; 
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
            if (currentNum === 0) {  // If user attempts to divide by zero, set computedValue to undefined, give an alert, and clear calculator
                computedValue = undefined;
                alert('Cannot divide by zero');
                clearCalculator();
            } else {
                computedValue = previousNum / currentNum;
            }
            break;
        default:
            return null;
    }
    // Update operand and operator values
    currentOperand = computedValue;
    currentOperator = null;
    previousOperand = '';
}


function updateDisplay() {

    // Display currentOperand value
    currentDisplayValue.textContent = currentOperand;
    
    if (currentDisplayValue.textContent.length < maxDisplayCharacterLength) {   // Prevent screen overflow by using maxDisplayCharacterLength as a limit
        currentDisplayValue.textContent = currentOperand;        
    }
    
    if (currentOperator === null) {
        previousDisplayValue.textContent = '';
    }
    else if (currentOperator !== null) {
        previousDisplayValue.textContent = `${previousOperand} ${currentOperator}`;   // Update smaller display text (previously clicked values)  Ex. 5 + 
    }
}


function clearCalculator() {
    // Reset operand and operator values
    previousOperand = '';
    currentOperand = '0';
    currentOperator = null;
    
    // Display 0 in currentDisplayValue
    previousDisplayValue.textContent = '';
    currentDisplayValue.textContent = currentOperand;
}

function roundOffAccurately(num, decimalPlaces) {
    let roundedValue = parseFloat(Math.round (num +'e'+ decimalPlaces) +'e-'+ decimalPlaces);
    currentOperand = roundedValue;
    return currentOperand;
}

function convertToExponentialNotation(num, decimalPlaces) {
    let roundedValue = num.toExponential(decimalPlaces);
    currentOperand = roundedValue;
    return currentOperand;
}

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
    
     // Check if computed value is written in exponential notation (Ex. 5.34258e+3)
    if (num.toString().includes('e')) {
        // Limit the decimal places of the number in exponential notation
        return convertToExponentialNotation(num, maxDecimalPlaces);
    }
    
    // Check if number is a float (decimal) or integer
    
    // Check if number is an integer 
    if (Number.isInteger(num)) {
        // Check if integer has less than or equal to 12 characters
        if (num.toString().length <= maxDisplayCharacterLength) {
            return roundOffAccurately(num, maxDecimalPlaces);
        } else { 
            return convertToExponentialNotation(num, maxDecimalPlaces);
        }
    }
    // Check if  number is a float or decimal
    if (!Number.isInteger(num)) {
        
        // Get the numbers before the decimal point
        let splitNumArray = num.toString().split('.');
        let beforeDecimalNum = splitNumArray[0];
        
        // Check if the number of digits before the decimal point is less than or equal to 6
        if (beforeDecimalNum.length <= maxDecimalPlaces) {
            return roundOffAccurately(num, maxDecimalPlaces);
        }
        else {
            return convertToExponentialNotation(num, maxDecimalPlaces);
        }
    }
}


function supportKeyBoardInput(event) {
    const key = event.key;   // the value of the key pressed by the user
    numberKey = document.querySelector(`[data-number="${key}"]`);
   
    if (key >= 0 && key <= 9) {   // process any number keys pressed from 0-9
        const numberPressed = numberKey.dataset.number;   // Get the value from data-number attribute in html file
        appendNumber(numberPressed);
        updateDisplay();
    }
    else if (key === '/' || key === '*' || key === '-' || key === '+') {   // Process the pressed following operator keys 
        event.preventDefault();    // prevent default action of key - ex. Mozilla Fox Quick Find feature using '/' key
        const operatorPressed = convertToOperatorSymbol(key);
        appendOperator(operatorPressed);
        updateDisplay();
    }   
     else if (key === '=' || key === 'Enter') {
        event.preventDefault();
        equalButton.click();
    }
    else if (key === 'Escape')
        clearCalculator();
    else if (key === '.')
        decimalButton.click(); 
    else if (key === '%')
        percentButton.click();
    else if (key === 'Backspace')
        backspaceButton.click(); 
}


function convertToOperatorSymbol(keyBoardOperator) { 
    // Convert the event.key values to operator symbols (÷, ×, −, +) used in the const currentOperator variable, operate function, etc  
    switch (keyBoardOperator) {
        case '/':
            return '÷';
        case '*':
            return '×';
        case '-':
            return '−';
        case '+':
            return '+'; 
    }
}