// Switch between calculators
document.getElementById('calculatorSelect').addEventListener('change', function() {
    const calculators = document.querySelectorAll('.calculator');
    calculators.forEach(calc => calc.style.display = 'none');
    const selectedCalculator = document.getElementById(this.value + 'Calculator');
    if (selectedCalculator) {
        selectedCalculator.style.display = 'block';
    }
});

// Normal Calculator
let normalInput = document.getElementById('normalInput');

function appendNormal(value) {
    normalInput.value += value;
}

function clearNormal() {
    normalInput.value = '';
}

function deleteLast() {
    normalInput.value = normalInput.value.slice(0, -1);
}

function calculateNormal() {
    try {
        normalInput.value = eval(normalInput.value);
    } catch (e) {
        normalInput.value = 'Error';
    }
}

// Indian Loan Calculator
function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTenure = parseFloat(document.getElementById('loanTenure').value);

    const monthlyInterest = (loanAmount * interestRate) / 100;
    const yearlyInterest = monthlyInterest * 12;
    const totalInterest = yearlyInterest + loanAmount;

    document.getElementById('loanResult').innerText = `Monthly Interest: ₹${monthlyInterest.toFixed(2)}\nYearly Interest: ₹${yearlyInterest.toFixed(2)}\nTotal Amount: ₹${totalInterest.toFixed(2)}`;
}

// BMI Calculator
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;

    const bmi = weight / (height * height);

    document.getElementById('bmiResult').innerText = `Your BMI: ${bmi.toFixed(2)}`;
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultElement = document.getElementById('currencyResult');

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
        resultElement.innerText = "Please enter a valid amount.";
        return;
    }

    try {
        // Alternative API: ExchangeRate.host (Free & No API Key Required)
        const response = await fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}`);
        if (!response.ok) throw new Error("Failed to fetch exchange rates.");
        
        const data = await response.json();
        
        // Validate conversion rate
        if (!data.rates || !data.rates[toCurrency]) throw new Error("Invalid currency selected.");
        
        // Calculate conversion
        const rate = data.rates[toCurrency];
        const convertedAmount = amount * rate;

        // Display result
        resultElement.innerText = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        resultElement.innerText = `Error: ${error.message}`;
    }
}

