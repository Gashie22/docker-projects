// Get all necessary elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let currentInput = '';
let operator = null;
let previousInput = null;

// Function to update the display
function updateDisplay(value) {
    display.value = value;
}

// Function to handle number and decimal button clicks
function appendInput(value) {
    // Prevent multiple decimals
    if (value === '.' && currentInput.includes('.')) return;
    
    // Clear display if it's currently showing 'Error' or a result
    if (currentInput === 'Error' || (previousInput === null && operator === null && currentInput !== '')) {
        currentInput = '';
    }

    currentInput += value;
    updateDisplay(currentInput);
}

// *** NEW FUNCTION: Delete the last character ***
function deleteLast() {
    if (currentInput === 'Error') {
        clearCalculator();
    } else {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    }
}

// Function to handle operator clicks
function handleOperator(nextOperator) {
    if (currentInput === '') return;

    if (previousInput !== null && operator !== null) {
        // If an operation is pending, calculate it first
        calculate();
        // The result of calculate() is now in currentInput. Use it as the new previousInput.
        previousInput = currentInput; 
    } else {
        previousInput = currentInput;
    }
    
    currentInput = '';
    operator = nextOperator;
    // Optional: display the operation chain, but for simplicity, let's just show previousInput
    updateDisplay(previousInput); 
}

// Function to perform the calculation (FIXED: ensures numbers are used)
function calculate() {
    let result;
    // *** FIX: Use parseFloat to ensure string inputs are treated as numbers ***
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    // Guard clause for incomplete input
    if (isNaN(prev) || isNaN(current) || operator === null) {
        // If they just hit '=' without an operation, do nothing
        return; 
    }

    try {
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    throw new Error('Division by zero');
                }
                result = prev / current;
                break;
            default:
                return;
        }

        // Set the result, clear operator/previous input
        currentInput = result.toString();
        operator = null;
        previousInput = null;
        updateDisplay(currentInput);
    } catch (error) {
        currentInput = 'Error';
        operator = null;
        previousInput = null;
        updateDisplay(currentInput);
    }
}

// Function to clear the calculator
function clearCalculator() {
    currentInput = '';
    operator = null;
    previousInput = null;
    updateDisplay('');
}

// Attach event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number') || button.classList.contains('decimal')) {
            appendInput(value);
        } else if (button.classList.contains('operator')) {
            handleOperator(value);
        } else if (button.classList.contains('equal')) {
            calculate();
        } else if (button.classList.contains('clear')) {
            clearCalculator();
        } else if (button.classList.contains('delete')) { // *** Handle DEL button ***
            deleteLast();
        }
    });
});