let userName = "";
let todos = [];

function getReply(command) {
  command = command.toLowerCase();

  if (command.startsWith("hello my name is ")) {
    let name = command.replace("hello my name is ", "");
    if (userName === name) {
      return "Nice to meet you again " + name;
    } else {
      userName = name;
      return "Nice to meet you " + name;
    }
  } else if (command === "what is my name") {
    if (userName === "") {
      return "I don't know your name yet";
    } else {
      return "Your name is " + userName;
    }
  } else if (command.startsWith("add ") && command.endsWith("to my todo")) {
    let task = command.replace("add ", "").replace(" to my todo", "");
    todos.push(task);
    return task + " added to your todo";
  } else if (
    command.startsWith("remove ") &&
    command.endsWith("from my todo")
  ) {
    let task = command.replace("remove ", "").replace(" from my todo", "");
    let index = todos.indexOf(task);
    if (index !== -1) {
      todos.splice(index, 1);
      return "Removed " + task + " from your todo";
    } else {
      return task + " is not in your todo";
    }
  } else if (command === "what is on my todo") {
    if (todos.length === 0) {
      return "Your todo list is empty";
    } else {
      return "You have " + todos.length + " todos - " + todos.join(" and ");
    }
  } else if (command === "what day is it today") {
    let today = new Date();
    let day = today.getDate();
    let month = today.toLocaleString("default", { month: "long" });
    let year = today.getFullYear();
    return day + ". of " + month + " " + year;
  } else if (command.startsWith("what is ")) {
    let expression = command.replace("what is ", "");
    try {
      let result = Function('"use strict"; return (' + expression + ")")(); // beginner-safe eval
      return result;
    } catch (err) {
      return "I cannot calculate that";
    }
  } else if (command.startsWith("set a timer for ")) {
    let minutes = parseInt(
      command.replace("set a timer for ", "").replace(" minutes", "")
    );
    setTimeout(function () {
      console.log("Timer done");
    }, minutes * 60 * 1000);
    return "Timer set for " + minutes + " minutes";
  } else {
    return "I don't understand that command";
  }
}

console.log(getReply("Hello my name is Benjamin"));
console.log(getReply("What is my name"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add singing in the shower to my todo"));
console.log(getReply("What is on my todo"));
console.log(getReply("Remove fishing from my todo"));
console.log(getReply("What is on my todo"));
console.log(getReply("What day is it today"));
console.log(getReply("What is 3 + 3"));
console.log(getReply("Set a timer for 0.1 minutes"));
