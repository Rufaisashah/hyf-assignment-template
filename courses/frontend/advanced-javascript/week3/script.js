const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");


window.addEventListener("load", initializeApp);

converterForm.addEventListener("submit", convertCurrency);

async function getCurrencyList() {                              // Renamed for clarity
  const response = await fetch("https://open.er-api.com/v6/latest/USD");
  const data = await response.json();
  return Object.keys(data.rates);
}


function populateDropdowns(currencies) {
  currencies.forEach(currency => {
    fromCurrency.appendChild(new Option(currency, currency));
    toCurrency.appendChild(new Option(currency, currency));
  });

  fromCurrency.value = "EUR";
  toCurrency.value = "DKK";
}


async function initializeApp() {
  try {
    // FIX 3: Calling the correct function name here
    const currencies = await getCurrencyList();
    populateDropdowns(currencies);
  } catch (error) {
    console.error("Failed to initialize app:", error);
    resultDiv.textContent = "Error loading currency list.";
  }
}


async function convertCurrency(event) {
  event.preventDefault(); // Prevents page refresh

  const amount = parseFloat(amountInput.value);
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  if (amount <= 0) {
    alert("Please enter an amount greater than 0.");
    return;
  }

  try {
    const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrencyValue}`);
    const data = await response.json();
    
    const rate = data.rates[toCurrencyValue];
    const convertedAmount = amount * rate;
    resultDiv.textContent = `${amount}${fromCurrencyValue} =${convertedAmount} ${toCurrencyValue}`;

}
