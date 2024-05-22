const resultEl = document.querySelector('.result');
const btns = document.querySelectorAll('button');

let result = ''; 
let currentInput = '';
let currentOperator = '';
let shouldResetInput = false;

const operators = ['+', '-', 'x', '/', '%'];

const isOperator = (value) => operators.includes(value);

const calculate = (num1, operator, num2) => {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                return 'Error';
            }
            return num1 / num2;
        case '%':
            return num1 % num2;
        default:
            return num2;
    }
};

btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const inputValue = e.target.textContent;

        if (inputValue === 'AC') {
            result = '';
            currentInput = '';
            currentOperator = '';
            resultEl.textContent = '0';
            return;
        }

        if (inputValue === '+/-') {
            if (currentInput) {
                currentInput = (parseFloat(currentInput) * -1).toString();
            }
            resultEl.textContent = currentInput || result || '0';
            return;
        }

        if (inputValue === '=') {
            if (currentInput && currentOperator) {
                result = calculate(result, currentOperator, currentInput).toString();
                currentInput = '';
                currentOperator = '';
            }
            resultEl.textContent = result;
            shouldResetInput = true;
            return;
        }

        if (isOperator(inputValue)) {
            if (currentInput && currentOperator) {
                result = calculate(result, currentOperator, currentInput).toString();
                currentInput = '';
            } else if (!currentInput) {
                result = '0';
            } else {
                result = currentInput;
                currentInput = '';
            }
            currentOperator = inputValue;
            resultEl.textContent = result;
            return;
        }

        if (inputValue === '.') {
            if (!currentInput.includes('.')) {
                currentInput += inputValue;
            }
        } else {
            if (shouldResetInput) {
                currentInput = inputValue;
                shouldResetInput = false;
            } else {
                currentInput += inputValue;
            }
        }

        resultEl.textContent = currentInput || result || '0';
    });
});
