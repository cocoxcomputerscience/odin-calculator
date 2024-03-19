function operate(op, a, b) {
    switch(op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "x":
        case "*":
            return a * b;
        case "÷":
        case "/":
            if (b === 0) {
                reset = true;
                return("ERROR")
            }
            return a / b;
    }
}

function updateDisplay(e) {
    // the input value changes depending on the event
    let input = e.type === "click" ? e.target.textContent : e.key;

    // run if text was not displayed using this function (displayed from clicking an operator)
    if (!clear) {
        display.textContent = DISPLAY_DEFAULT;
        clear = true;
        decimal = false
    }

    // limits display length
    if (display.textContent.length === 20) return;

    // do not want leading zeros unless the input is a decimal
    if (display.textContent === DISPLAY_DEFAULT) {
        if (input === ".") {
            display.textContent += input;
            decimal = true;
        } else {
            display.textContent = input;
        }
        return;
    }

    // checks for a decimal in the input
    if (input === "." && decimal) return;
    if (input === ".") decimal = true;

    display.textContent += input;
}

function executeOperator(e) {
    // the input value changes depending on the event
    let input = (e.type === "click") ? e.target.textContent : e.key;
    if (input === "Enter") input = "=";

    // run if this is the fist operator used or the first operator used after clicking "=" 
    if (reset) {
        // checks for user input
        if(display.textContent === "ERROR") return;
        if(input === "=") return;

        op = input;
        a = display.textContent;

        displayComputation.textContent = `${a} ${op}`;
        clear = false;
        reset = false;
        return
    }

    // returns if operators are clicked repeatedly
    // sets op to last operator clicked
    if(!clear) {
        op = input;

        // the display computation text is dependent on the last operator
        displayComputation.textContent = displayComputation.textContent.slice(0, -1) + op;
        if (op === "=") displayComputation.textContent = displayComputation.textContent.slice(0, -1);

        // setting reset variable if op is "="
        reset = op === "=" ? true : false;
        return;
    }

    b = display.textContent;
    a = operate(op, +a, +b).toString();
    op = input;
    display.textContent = a;

    // flag to reset
    if(op === "=") reset = true;
    // flag to clear display
    clear = false;

    // display computations
    if (op === "=") {
        displayComputation.textContent += ` ${b} ${op}`;
    } else {
        displayComputation.textContent = `${a} ${op}`;
    }
}

function clearDisplay() {
    display.textContent = DISPLAY_DEFAULT;
    decimal = false;
}

const DISPLAY_DEFAULT = "0";
const DISPLAY_COMPUTATION_DEFAULT = "";
let a;                   // running total  ; string
let b;                   // second operand ; string
let op;                  // operator
let reset = true;        // flag for resetting math operation
let clear = true;        // flag for if the display was/was not updated by updateDisplay function
let decimal = false;     // flag for if user input contains decimal

let displayComputation = document.querySelector("#display-computation");
let display = document.querySelector("#display");
let nums = document.querySelectorAll(".num");
let decimalBtn = document.querySelector("#decimal");
let operators = document.querySelectorAll(".operator");
let allClearBtn = document.querySelector("#all-clear");
let clearBtn = document.querySelector("#clear");

nums.forEach(num => num.addEventListener("click", updateDisplay));
decimalBtn.addEventListener("click", updateDisplay);
operators.forEach(op => op.addEventListener("click", executeOperator)); 
allClearBtn.addEventListener("click", () => {
    reset = true;
    clear = true;
    display.textContent = DISPLAY_DEFAULT;
    displayComputation.textContent = DISPLAY_COMPUTATION_DEFAULT;
});
clearBtn.addEventListener("click", clearDisplay);
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || e.key === ".") {
        updateDisplay(e);
    } else if (e.key === "/" || e.key === "-" || e.key === "=" || e.key === "*" || e.key === "+" || e.key === "Enter") {
        executeOperator(e);
    } else if(e.key === "Backspace") {
        clearDisplay();
    }
});