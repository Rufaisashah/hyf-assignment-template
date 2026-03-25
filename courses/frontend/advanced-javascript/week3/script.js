const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const inputAmount = document.getElementById("amount");
const resultDiv = document.getElementById("result");

let exchangeRates = {};

window.addEventListener("load", fetchCurrencies);
converterForm.addEventListener("submit", convertcurrency);

async function fetchCurrencies() {
  const response = await fetch("https://open.er-api.com/v6/latest/USD");
  const data = await response.json();
  
  console.log(data);
  exchangeRates = data.rates;
  const currencyOptions = Object.keys(data.rates);

  currencyOptions.forEach(currency => {
    
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency; 
    fromCurrency.appendChild(option1)

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency; 
    toCurrency.appendChild(option2);
});
 fromCurrency.value = "EUR";
  toCurrency.value = "DKK";
}
function convertcurrency(event) {
    event.preventDefault(); 

    
}
