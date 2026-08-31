const display =
    document.getElementById("current-display");

const previousDisplay =
    document.getElementById("previous-operation");


let currentNumber = "";

let previousNumber = "";

let operator = null;


/* =========================
   ADD NUMBER
========================= */

function appendNumber(number) {

    if (
        number === "." &&
        currentNumber.includes(".")
    ) {
        return;
    }

    if (
        currentNumber === "0" &&
        number !== "."
    ) {
        currentNumber = "";
    }

    currentNumber += number;

    display.textContent = currentNumber;

    updateLiveResult();
}


/* =========================
   CHOOSE OPERATOR
========================= */

function chooseOperator(selectedOperator) {

    if (
        currentNumber === "" &&
        previousNumber === ""
    ) {
        return;
    }

    /*
       If there is already a complete operation,
       calculate it before choosing the next operator.
    */

    if (
        previousNumber !== "" &&
        currentNumber !== ""
    ) {
        calculate();
    }

    previousNumber = currentNumber;

    currentNumber = "";

    operator = selectedOperator;

    const symbol =
        getOperatorSymbol(selectedOperator);

    previousDisplay.textContent =
        `${previousNumber} ${symbol}`;

    /*
       Clear the main display so the user
       can enter the second number.
    */

    display.textContent = "0";

}


/* =========================
   LIVE RESULT
========================= */

function updateLiveResult() {

    /*
       We only calculate a preview when:
       previous number + operator + current number
       all exist.
    */

    if (
        previousNumber !== "" &&
        currentNumber !== "" &&
        operator !== null
    ) {

        const number1 =
            parseFloat(previousNumber);

        const number2 =
            parseFloat(currentNumber);

        let result;


        switch (operator) {

            case "+":

                result =
                    number1 + number2;

                break;


            case "-":

                result =
                    number1 - number2;

                break;


            case "*":

                result =
                    number1 * number2;

                break;


            case "/":

                if (number2 === 0) {

                    display.textContent =
                        "Error";

                    return;
                }

                result =
                    number1 / number2;

                break;

        }


        /*
           Prevent long decimal results.
        */

        result =
            Number(result.toFixed(10));


        display.textContent =
            result;

    }

}


/* =========================
   CALCULATE
========================= */

function calculate() {

    if (
        previousNumber === "" ||
        currentNumber === "" ||
        operator === null
    ) {
        return;
    }


    const number1 =
        parseFloat(previousNumber);

    const number2 =
        parseFloat(currentNumber);

    let result;


    switch (operator) {

        case "+":

            result =
                number1 + number2;

            break;


        case "-":

            result =
                number1 - number2;

            break;


        case "*":

            result =
                number1 * number2;

            break;


        case "/":

            if (number2 === 0) {

                display.textContent =
                    "Error";

                previousDisplay.textContent =
                    "Cannot divide by zero";

                currentNumber = "";

                previousNumber = "";

                operator = null;

                return;
            }

            result =
                number1 / number2;

            break;

    }


    result =
        Number(result.toFixed(10));


    const symbol =
        getOperatorSymbol(operator);


    previousDisplay.textContent =
        `${number1} ${symbol} ${number2} =`;


    display.textContent =
        result;


    currentNumber =
        result.toString();


    previousNumber = "";

    operator = null;

}


/* =========================
   CLEAR
========================= */

function clearDisplay() {

    currentNumber = "";

    previousNumber = "";

    operator = null;

    display.textContent = "0";

    previousDisplay.textContent = "";

}


/* =========================
   DELETE
========================= */

function deleteLast() {

    /*
       When an operator has been selected,
       deleting should affect the current number.
    */

    currentNumber =
        currentNumber.slice(0, -1);


    if (currentNumber === "") {

        display.textContent = "0";

    } else {

        display.textContent =
            currentNumber;

    }

    updateLiveResult();

}


/* =========================
   OPERATOR SYMBOL
========================= */

function getOperatorSymbol(operator) {

    switch (operator) {

        case "+":
            return "+";

        case "-":
            return "−";

        case "*":
            return "×";

        case "/":
            return "÷";

        default:
            return "";

    }

}


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        /* Numbers */

        if (!isNaN(key)) {

            appendNumber(key);

            highlightKey(key);

        }


        /* Decimal */

        else if (key === ".") {

            appendNumber(".");

            highlightKey(".");

        }


        /* Operators */

        else if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/"
        ) {

            chooseOperator(key);

            highlightKey(key);

        }


        /* Enter */

        else if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

            highlightKey("Enter");

        }


        /* Backspace */

        else if (key === "Backspace") {

            deleteLast();

            highlightKey("Backspace");

        }


        /* Escape */

        else if (key === "Escape") {

            clearDisplay();

            highlightKey("Escape");

        }

    }
);


/* =========================
   KEYBOARD ANIMATION
========================= */

function highlightKey(key) {

    const button =
        document.querySelector(
            `[data-key="${key}"]`
        );


    if (!button) {
        return;
    }


    button.classList.add("pressed");


    setTimeout(function() {

        button.classList.remove("pressed");

    }, 120);

}