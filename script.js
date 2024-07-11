document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    const clearButton = document.getElementById('clear');
    const equalButton = document.getElementById('equal');

    let currentInput = '';
    let operator = null;
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            if (value === '+' || value === '-' || value === '*' || value === '/') {
                if (currentInput === '') return;
                if (operator) calculate();
                previousInput = currentInput;
                operator = value;
                currentInput = '';
            } else {
                currentInput += value;
            }
            updateDisplay();
        });
    });

    clearButton.addEventListener('click', function() {
        currentInput = '';
        previousInput = '';
        operator = null;
        updateDisplay();
    });

    equalButton.addEventListener('click', function() {
        calculate();
        updateDisplay();
    });

    function updateDisplay() {
        display.textContent = currentInput || previousInput || '0';
    }

    function calculate() {
        let result;
        const previous = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(previous) || isNaN(current)) return;
        switch (operator) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '/':
                result = previous / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = '';
    }
});
