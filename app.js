document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let firstOperand = '';
    let calculationProcess = '';

    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', function () {
            const value = button.textContent;

            if (!isNaN(value) || value === '.') {
                currentInput += value;
                calculationProcess += value;
                display.value = calculationProcess;
            } else if (value === 'C') {
                currentInput = '';
                firstOperand = '';
                operator = '';
                calculationProcess = '';
                display.value = '';
            } else if (value === '=') {
                if (operator && firstOperand !== '') {
                    currentInput = calculate(firstOperand, currentInput, operator);
                    calculationProcess += '=' + currentInput;
                    display.value = calculationProcess;
                    firstOperand = '';
                    operator = '';
                }
            } else if (value === 'CE') {
                currentInput = '';
                calculationProcess = calculationProcess.slice(0, -1); // Remove the last character
                display.value = calculationProcess;
            } else {
                if (operator && firstOperand !== '') {
                    currentInput = calculate(firstOperand, currentInput, operator);
                    calculationProcess += value;
                    display.value = calculationProcess;
                    firstOperand = currentInput;
                    operator = value;
                    currentInput = '';
                } else {
                    firstOperand = currentInput;
                    operator = value;
                    calculationProcess += value;
                    display.value = calculationProcess;
                    currentInput = '';
                }
            }
        });
    });

    function calculate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                if (b === 0) {
                    return 'Error';
                }
                return (a / b).toString();
        }
    }
});
