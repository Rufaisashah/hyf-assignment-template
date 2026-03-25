const converterForm= document.getElementById("converter-form");
const formCurrency= document.getElementById("form-curreny");
const toCurrency= document.getElementById("to-currency");
const inputAmount= document.getElementById("amount");
const resultDiv= document.getElementById("result");

window.addEventListener("load" , fetchCurrencies);
converterForm.addEventListener("submit" ,convertcurrency)

async function fetchCurrencies(){
const response = await fetch("https://open.er-api.com/v6/latest/USD");
const data = await response.json()
const currencyOptions =data.rates;

}

function convertcurrency(){
 

}