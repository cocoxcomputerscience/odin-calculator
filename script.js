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

function displayNum(e) {
    // run if text was not displayed using this function
    if(!clearDisplay) {
        display.textContent = "0";
        clearDisplay = true;
    }
    if (display.textContent === "0") {
        display.textContent = e.target.textContent;
        return;
    }
    display.textContent += e.target.textContent;
}

function allClearMemory() {
    reset = true;
    clearDisplay = true;
    display.textContent = "0";
    displayComp.textContent = "";
}

let displayComp = document.querySelector("#display-comp");
let display = document.querySelector("#display");
let nums = document.querySelectorAll(".num");
let operators = document.querySelectorAll(".operator");
let allClearBtn = document.querySelector("#all-clear");
let clearBtn = document.querySelector("#clear");
operators.forEach(op => op.addEventListener("click", opClicked)); 
nums.forEach(num => num.addEventListener("click", displayNum));
allClearBtn.addEventListener("click", allClearMemory);
clearBtn.addEventListener("click", () => display.textContent = "0");

let a;                   // running total
let b;
let op; 
let reset = true;        // flag for first operator used
let clearDisplay = true; // flag for clearing display 

function opClicked(e) {
    // for the first operator used or first operator used after clicking "="
    if(reset) {
        // checks for user input
        if(display.textContent === "" || display.textContent === "ERROR") return;
        if(e.target.textContent === "=") return;

        op = e.target.textContent;
        a = +display.textContent;
        displayComp.textContent = `${a} ${op}`;
        clearDisplay = false;
        reset = false;
        return
    }

    // returns if operators are clicked repeatedly
    // sets op to last operator clicked
    if(!clearDisplay) {
        op = e.target.textContent;

        // the display computation text is dependent on the operator
        displayComp.textContent = displayComp.textContent.slice(0, -1) + op;
        if (op === "=") displayComp.textContent = displayComp.textContent.slice(0, -1);

        // setting reset variable if op is "="
        reset = op === "=" ? true : false;
        return;
    }

    b = +display.textContent;
    a = operate(op, a, b);
    op = e.target.textContent;
    display.textContent = a;

    // flag to reset
    if(op === "=") reset = true;
    // flag to clear display
    clearDisplay = false;

    // display computations
    if (op === "=") {
        displayComp.textContent += ` ${b} ${op}`;
    } else {
        displayComp.textContent = `${a} ${op}`;
    }
}