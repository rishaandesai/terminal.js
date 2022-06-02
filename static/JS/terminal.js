let userInput, terminalOutput;
let projAsk = false;
let lastCommands = [];

console.log("Welcome to my website!");

const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("dummyKeyboard").focus();
  console.log("Application loaded");
};

const execute = function executeCommand(input) {
  input = input.toLowerCase();
  lastCommands.push(input);
  let output;
  if (input.length === 0) {
    return;
  }
  if (input.indexOf("sudo") >= 0) {
    input = "sudo";
  }

  let request = $.ajax({
        type: "POST",
        url: "/exec",
        data: {
          "run": input
        }
    });
  request.done(function (data) {
    //     terminalOutput.innerHTML = `${terminalOutput.innerHTML}<br><div class="terminal-line">${data}<br></div>`;
    // terminalOutput.scrollTop = terminalOutput.scrollHeight;
    output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`
    
  output += data;
    terminalOutput.innerHTML = `${terminalOutput.innerHTML}<br><div class="terminal-line">${output}<br></div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    })

  // if (input == "projects") {
  //   open("pages/projects.html");
  // } else if (input === "clear" || input === "cls") {
  //   clearScreen();
  // } else if (input === "history") {
  //   showHist();
  // } else if (input === "github") {
  //   open("https://github.com/Aayush9029");
  // } else {
  //   output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
  //   if (!COMMANDS.hasOwnProperty(input)) {
  //     output += `<div class="terminal-line">command not found: ${input}</div>`;
  //   } else {
  //     output += COMMANDS[input];
  //   }

  //   terminalOutput.innerHTML = `${terminalOutput.innerHTML}<br><div class="terminal-line">${output}<br></div>`;
  //   terminalOutput.scrollTop = terminalOutput.scrollHeight;
  // }
};

const key = (e) => {
  const input = userInput.innerHTML;

  if (e.key === "Enter") {
    execute(input);
    userInput.innerHTML = "";
    return;
  }

  userInput.innerHTML = input + e.key;
};

const backspace = (e) => {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};

function showHist() {
  terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">${lastCommands.join(", ")}</div>`;
}

let iter = 0;
const up = (e) => {
  if (e.key === "ArrowUp") {
    if (lastCommands.length > 0 && iter < lastCommands.length) {
      iter += 1;
      userInput.innerHTML = lastCommands[lastCommands.length - iter];
    }
  }

  if (e.key === "ArrowDown") {
    if (lastCommands.length > 0 && iter > 1) {
      iter -= 1;
      userInput.innerHTML = lastCommands[lastCommands.length - iter];
    }
  }
};

function clearScreen() {
  location.reload();
}
document.addEventListener("keydown", up);

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);
