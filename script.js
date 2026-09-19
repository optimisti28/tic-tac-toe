let startButton = document.getElementById("start");

let board = document.getElementById("board");

let boxes = document.querySelectorAll(".box");

let currentPlayer = "X";

let boardState = ["", "", "", "", "", "", "", "", ""];

let gameOver = false;


/* Winning combinations */

let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


/* START / RESET button */

startButton.addEventListener("click", function() {

    /* If button says RESET, reset the game */

    if (startButton.textContent === "RESET") {

        boxes.forEach(function(box) {
            box.textContent = "";
        });

        boardState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameOver = false;

        let winLine = document.querySelector(".win-line");

        if (winLine) {
            winLine.remove();
        }

        return;
    }


    /* Start the game */

    startButton.style.transform = "translateX(505px) translateY(100px)";
    board.style.transform = "translateX(450px) translateY(150px)";

    startButton.textContent = "RESET";
});


/* Check winner */

function checkWinner() {

    for (let combination of winningCombinations) {

        let a = combination[0];
        let b = combination[1];
        let c = combination[2];

        if (
            boardState[a] !== "" &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        ) {

            console.log(boardState[a] + " wins!");

            gameOver = true;

            /* Change RESET to WINNER */

            startButton.textContent = "WINNER";

            startButton.classList.add("winner");
            startButton.disabled = true;

            /* Create winning line */

            createWinLine(combination);

            /* Create new RESET button */

            createResetButton();

            return;
        }
    }
}


/* Create winning line */

function createWinLine(combination) {

    let line = document.createElement("div");

    line.classList.add("win-line");


    if (combination[0] === 0 && combination[1] === 1) {
        line.classList.add("row-1");
    }

    else if (combination[0] === 3 && combination[1] === 4) {
        line.classList.add("row-2");
    }

    else if (combination[0] === 6 && combination[1] === 7) {
        line.classList.add("row-3");
    }

    else if (combination[0] === 0 && combination[1] === 3) {
        line.classList.add("column-1");
    }

    else if (combination[0] === 1 && combination[1] === 4) {
        line.classList.add("column-2");
    }

    else if (combination[0] === 2 && combination[1] === 5) {
        line.classList.add("column-3");
    }

    else if (combination[0] === 0 && combination[1] === 4) {
        line.classList.add("diagonal-1");
    }

    else if (combination[0] === 2 && combination[1] === 4) {
        line.classList.add("diagonal-2");
    }

    board.appendChild(line);
}


/* Create new RESET button */

function createResetButton() {

    let resetButton = document.createElement("button");

    resetButton.textContent = "RESET";

    resetButton.classList.add("button");
    resetButton.classList.add("new-reset");

    document.body.appendChild(resetButton);


    resetButton.addEventListener("click", function() {

        boxes.forEach(function(box) {
            box.textContent = "";
        });

        boardState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameOver = false;

        let winLine = document.querySelector(".win-line");

        if (winLine) {
            winLine.remove();
        }

        startButton.textContent = "RESET";
        startButton.classList.remove("winner");
        resetButton.remove();
    });
}


/* X and O logic */

function handleClick(box, index) {

    if (gameOver === true) {
        return;
    }

    if (boardState[index] !== "") {
        return;
    }

    box.textContent = currentPlayer;

    boardState[index] = currentPlayer;

    checkWinner();

    if (gameOver === true) {
        return;
    }

    if (currentPlayer === "X") {
        currentPlayer = "O";
    }

    else {
        currentPlayer = "X";
    }
}


/* Click boxes */

boxes.forEach(function(box, index) {

    box.addEventListener("click", function() {

        handleClick(box, index);

    });

});