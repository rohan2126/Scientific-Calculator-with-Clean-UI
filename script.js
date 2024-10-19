const display = document.getElementById('display');
let currentInput = '';
let equation = '';

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;
        handleInput(buttonText);
    });
});

function handleInput(buttonText) {
    if (isNumber(buttonText) || buttonText === '.') {
        appendNumber(buttonText);
    } else if (isOperator(buttonText)) {
        appendOperator(buttonText);
    } else if (buttonText === '=') {
        calculateResult();
    } else if (buttonText === 'C') {
        clearDisplay();
    } else if (isFunction(buttonText)) {
        applyFunction(buttonText);
    }
    updateDisplay();
}


function isNumber(input) {
    return !isNaN(input);
}


function isOperator(input) {
    return ['+', '-', '*', '/'].includes(input);
}


function appendNumber(number) {
    currentInput += number;
    equation += number;
}


function appendOperator(operator) {
    if (currentInput === '') return;
    currentInput = '';
    equation += operator;
}


function isFunction(input) {
    return ['sin', 'cos', 'tan', 'log', '√', 'π', 'e', '^'].includes(input);
}


function applyFunction(func) {
    let value;
    switch (func) {
        case 'sin':
            value = Math.sin(parseFloat(currentInput)).toFixed(5);
            break;
        case 'cos':
            value = Math.cos(parseFloat(currentInput)).toFixed(5);
            break;
        case 'tan':
            value = Math.tan(parseFloat(currentInput)).toFixed(5);
            break;
        case 'log':
            value = Math.log10(parseFloat(currentInput)).toFixed(5);
            break;
        case '√':
            value = Math.sqrt(parseFloat(currentInput)).toFixed(5);
            break;
        case 'π':
            value = Math.PI;
            break;
        case 'e':
            value = Math.E;
            break;
        case '^':
            equation += '**';
            return;
        default:
            value = '';
    }
    equation = value.toString();
    currentInput = '';
}


function calculateResult() {
    try {
        const result = eval(equation);
        equation = result.toString();
        currentInput = '';
    } catch (error) {
        equation = 'Error';
    }
}


function clearDisplay() {
    currentInput = '';
    equation = '';
}


function updateDisplay() {
    display.value = equation || '0';
}
