function operate(op, a, b) {
    switch(op) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
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

function clear() {
    reset = true;
    clearDisplay = true;
    display.textContent = "0";
}

let display = document.querySelector("#display");
let nums = document.querySelectorAll(".num");
let operators = document.querySelectorAll(".operator");
let clearBtn = document.querySelector("#clear");
let delBtn = document.querySelector("#delete");
operators.forEach(op => op.addEventListener("click", opClicked)); 
nums.forEach(num => num.addEventListener("click", displayNum));
clearBtn.addEventListener("click", clear);
delBtn.addEventListener("click", () => display.textContent = display.textContent.slice(0, -1));

let a;                   // running total
let b;
let op; 
let reset = true;        // flag for first operator used
let clearDisplay = true; // flag for clearing display 

function opClicked(e) {
    // for the first operator used or first operator used after clicking "="
    if(reset) {
        // checks for user input
        if(display.textContent === "") return;
        if(e.target.textContent === "=") return;

        op = e.target.textContent;
        a = +display.textContent;
        clearDisplay = false;
        reset = false;
        return
    }

    // returns if operators are clicked repeatedly
    // sets op to last operator clicked
    if(!clearDisplay) {
        op = e.target.textContent;
        
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
}