function operate(op, a, b) {
    switch(op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                reset = true;
                return("ERROR")
            }
            return a / b;
    }
}

function updateDisplay(e) {
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
        if (e.target.textContent === ".") {
            display.textContent += e.target.textContent;
            decimal = true;
        } else {
            display.textContent = e.target.textContent;
        }
        return;
    }

    // checks for a decimal in the input
    if (e.target.textContent === "." && decimal) return;
    if (e.target.textContent === ".") decimal = true;

    display.textContent += e.target.textContent;
}

function clearAll() {
    reset = true;
    clear = true;
    display.textContent = DISPLAY_DEFAULT;
    displayComp.textContent = DISPLAY_COMP_DEFAULT;
}

function executeOperator(e) {
    // for the first operator used or first operator used after clicking "="
    if(reset) {
        // checks for user input
        if(display.textContent === "" || display.textContent === "ERROR") return;
        if(e.target.textContent === "=") return;

        op = e.target.textContent;
        a = display.textContent;

        displayComp.textContent = `${a} ${op}`;
        clear = false;
        reset = false;
        return
    }

    // returns if operators are clicked repeatedly
    // sets op to last operator clicked
    if(!clear) {
        op = e.target.textContent;

        // the display computation text is dependent on the last operator
        displayComp.textContent = displayComp.textContent.slice(0, -1) + op;
        if (op === "=") displayComp.textContent = displayComp.textContent.slice(0, -1);

        // setting reset variable if op is "="
        reset = op === "=" ? true : false;
        return;
    }

    b = display.textContent;
    a = operate(op, +a, +b).toString();
    op = e.target.textContent;
    display.textContent = a;

    // flag to reset
    if(op === "=") reset = true;
    // flag to clear display
    clear = false;

    // display computations
    if (op === "=") {
        displayComp.textContent += ` ${b} ${op}`;
    } else {
        displayComp.textContent = `${a} ${op}`;
    }
}

const DISPLAY_DEFAULT = "0";
const DISPLAY_COMP_DEFAULT = "";
let a;                   // running total  ; string
let b;                   // second operand ; string
let op;                  // operator
let reset = true;        // flag for resetting math operation
let clear = true;        // flag for if the display was/was not updated by updateDisplay function
let decimal = false;     // flag for if user input contains decimal

let displayComp = document.querySelector("#display-comp");
let display = document.querySelector("#display");
let nums = document.querySelectorAll(".num");
let operators = document.querySelectorAll(".operator");
let decimalBtn = document.querySelector("#decimal");
let allClearBtn = document.querySelector("#all-clear");
let clearBtn = document.querySelector("#clear");
nums.forEach(num => num.addEventListener("click", updateDisplay));
operators.forEach(op => op.addEventListener("click", executeOperator)); 
decimalBtn.addEventListener("click", updateDisplay);
allClearBtn.addEventListener("click", clearAll);
clearBtn.addEventListener("click", () => {
    display.textContent = DISPLAY_DEFAULT;
    decimal = false;
});