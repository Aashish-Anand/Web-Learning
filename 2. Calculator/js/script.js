var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {

        var number = getOutput();

        /*
         we are appending the new number at the end of existing data that is there in the input box
         i.e 5 and we press 6 after that then it become 56
         */
        if (number != NaN) {
            number += this.value;
            // console.log("Inside number : " + number);
            printOutput(number);
        }
    });
}

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {

        //for clearing the screen
        if (this.value === "clear") {
            clearHistory();
            clearOutput();

        } else if (this.value === "=") {
            var output = parseInt(getOutput());
            var history = getHistory();

            // Method 1
            // var operator = history[history.length - 1];
            // history = parseInt(history.substring(0, history.length - 1));

            // var result;
            // switch (operator) {
            //     case '+':
            //         result = history + output;
            //         break;
            //     case '-':
            //         result = history - output;
            //         break;
            //     case '/':
            //         result = history / output;
            //         break;
            //     case '*':
            //         result = history * output;
            //         break;
            // }

            //Method 2 - More reliable and do sequence of execution
            var expression = history + output;
            var result = eval(expression);

            printResult(result);
            clearHistory();

        } else {
            // we are adding the current element to the existing history with the operator
            // getHistory() = 2+ , getOuput() = 4 and this.value = *
            // no history become = 2+4* 
            addHistory(getHistory() + getOutput() + this.value);
            clearOutput();
        }
    });
}

function getOutput() {
    return document.getElementById("output").innerText;
}

function printOutput(number) {
    return document.getElementById("output").innerText = number;
}

function clearOutput() {
    document.getElementById("output").innerText = "";
}

function addHistory(number) {
    document.getElementById("history").innerText = number;
}

function getHistory() {
    return document.getElementById("history").innerText;
}

function clearHistory() {
    document.getElementById("history").innerText = "";
}

function printResult(number) {
    if (number != NaN) {
        document.getElementById("output").innerText = number;
    } else {
        document.getElementById("output").innerText = "Err";
    }
}