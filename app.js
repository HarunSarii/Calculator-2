// Variables

const previousElement = document.querySelector(".previous-display");
const currentElement = document.querySelector(".current-display");

const acButton = document.querySelector(".ac");
const pmButton = document.querySelector(".pm");
const percentButton = document.querySelector(".percent");

const additionButton = document.querySelector(".addition");
const substractionButton = document.querySelector(".subtraction");
const multiplicationButton = document.querySelector(".multiplication");
const divisionButton = document.querySelector(".division");
const equalButton = document.querySelector(".equal");

const decimalButton = document.querySelector(".decimal");
const number0 = document.querySelector(".number-0");
const number1 = document.querySelector(".number-1");
const number2 = document.querySelector(".number-2");
const number3 = document.querySelector(".number-3");
const number4 = document.querySelector(".number-4");
const number5 = document.querySelector(".number-5");
const number6 = document.querySelector(".number-6");
const number7 = document.querySelector(".number-7");
const number8 = document.querySelector(".number-8");
const number9 = document.querySelector(".number-9");
const numbersArray = [
  number0,
  number1,
  number2,
  number3,
  number4,
  number5,
  number6,
  number7,
  number8,
  number9,
];

let previousOperand = "";
let currentOperand = "";
let operation = undefined;
let temporaryOperand = "";

// Functions

function DisplayNumbers() {
  if (operation) {
    previousElement.innerText = `${previousOperand} ${operation}`;
  } else {
    previousElement.innerText = previousOperand;
  }

  currentElement.innerText = currentOperand;
}

function AppendNumber(number) {
  console.log("NUMBER: ", number);
  
    if (number === "." && currentOperand.includes(".")) return;
  if (number === 0 && currentOperand === "0") return;
  if (currentOperand.length > 7) return;

  

  currentOperand = currentOperand.toString() + number.toString();
  DisplayNumbers();
}

function ChooseOperation(selectedOperation) {
  if (temporaryOperand) {
    previousOperand = temporaryOperand.toString();
    currentOperand = "";
    temporaryOperand = "";
    operation = selectedOperation;
    DisplayNumbers();
    return;
  }

  if (currentOperand === "") return;

  previousOperand = currentOperand;
  currentOperand = "";
  operation = selectedOperation;
  DisplayNumbers();
}

function Compute() {
  console.log("COMPUTE");
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  let computation;

  if (isNaN(previous) || isNaN(current) ) return;

  switch (operation) {
    case "+":
      computation = previous + current;
      break;

    case "-":
      computation = previous - current;
      break;

    case "*":
      computation = previous * current;
      break;

    case "/":
      computation = previous / current;
      break;

    default:
      break;
  }

  currentOperand = computation;
  operation = undefined;
  previousOperand = "";
  DisplayNumbers();
  temporaryOperand = currentOperand;
  currentOperand = "";
}

function AllClear() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
  temporaryOperand = "";
  DisplayNumbers();
}

function PlusMinus() {
  currentOperand = currentOperand * -1;
  DisplayNumbers();
}

function Percent() {
  currentOperand = currentOperand / 100;
  DisplayNumbers();
}

// Add event listener to operators buttons

additionButton.addEventListener("click", () => {
  ChooseOperation("+");
});

substractionButton.addEventListener("click", () => {
  ChooseOperation("-");
});

multiplicationButton.addEventListener("click", () => {
  ChooseOperation("*");
});

divisionButton.addEventListener("click", () => {
  ChooseOperation("/");
});

equalButton.addEventListener("click", () => {
  Compute();
});

// Add event listener to top buttons

acButton.addEventListener("click", () => {
  AllClear();
});

pmButton.addEventListener("click", () => {
  PlusMinus();
});

percentButton.addEventListener("click", () => {
  Percent();
});

// Add event listener to numbers buttons

for (let i = 0; i < numbersArray.length; i++) {
  const number = numbersArray[i];

  number.addEventListener("click", () => {
    AppendNumber(i);
    temporaryOperand = "";
  });
}

decimalButton.addEventListener("click", () => {
  AppendNumber(decimalButton.innerText);
});

document.addEventListener('keydown', (event) => {

    switch(event.keyCode){
        case 96:
        case 97:
        case 98:
        case 99:
        case 100:
        case 101:
        case 102:
        case 103:
        case 104:
        case 105:
            AppendNumber(`${event.key}`);
            break;
        case 106:
        case 107:
        case 109:
        case 111:
            ChooseOperation(`${event.key}`)
        case 13:
            Compute();
    }
})