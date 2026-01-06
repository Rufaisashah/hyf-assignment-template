const input = document.getElementById("nameInput");
const button = document.getElementById("assignHouseBtn");
const output = document.getElementById("houseOutput");

const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
const houseDescriptions = {
  Gryffindor: "Brave and daring!",
  Hufflepuff: "Loyal and fair!",
  Ravenclaw: "Wise and witty!",
  Slytherin: "Cunning and ambitious!",
};

button.addEventListener("click", function () {
  const name = input.value.trim();

  if (name === "") {
    output.textContent = "Please enter your name first!";
    input.focus(); // Focus input even if empty
    return; // Stop further execution
  }

  const randomIndex = Math.floor(Math.random() * houses.length);
  const house = houses[randomIndex];
  
  output.textContent = `${name} belongs in ${house}! ${houseDescriptions[house]}`;
  input.value = "";
  input.focus();
});
