let board = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

let bestScore = 0;
let currentScore = 0;
let isLimited = true;
let previousBoard = board;
let previousBestScore = bestScore;
let previousCurrentScore = currentScore;

function cloneBoard(b) {
    return b.map(row => [...row]);
}

function addNumber() {
    let emptySquares = [];
    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === 0)
                emptySquares.push({i, j});
        });
    });

    if (emptySquares.length > 0) {
        let {i, j} = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        let nb = 2;
        if (Math.random() < 0.1)
            nb = 4;
        board[i][j] = nb;
    }
}

function updateGrid() {
    const squares = document.querySelectorAll('.cell');
    let index = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === 0)
                squares[index].textContent = '';
            else
                squares[index].textContent = board[i][j]
            index++;
        }
    }
}

function notifyFinished() {
    let isLosted = isLost();
    let isWined = isWin();
    const msg = document.getElementById("message");
    msg.textContent = "";

    if (isLosted) {
        msg.textContent = "You lost!";
        alert("You lost!");
    }
    if (isWined) {
        msg.textContent = "You Win!";
        showWinAnimation();
        alert("You Win !");
    }
}

function updateScore() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] > bestScore) {
                bestScore = board[i][j];
            }
            if (board[i][j] > currentScore) {
                currentScore = board[i][j];
            }
        }
    }

    const msgBest = document.getElementById("best");
    msgBest.textContent = bestScore.toString();

    const msgCurrent = document.getElementById("score");
    msgCurrent.textContent = currentScore.toString();
}

document.addEventListener('keydown', (event) => {
    let isChanged = false;
    previousBoard = cloneBoard(board);
    if (event.key === 'ArrowRight') {
        isChanged = moveRight()
    } else if (event.key === 'ArrowLeft') {
        isChanged = moveLeft();
    } else if (event.key === 'ArrowUp') {
        isChanged = moveUp();
    } else if (event.key === 'ArrowDown') {
        isChanged = moveDown();
    }
    if (isChanged) {
        addNumber();
        updateScore();
        updateGrid();
    }
    notifyFinished();
});

function isLost() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            let cell = board[i][j];
            if (j < board.length - 1 && cell === board[i][j + 1]) {
                return false;
            }
            if (i < board.length - 1 && cell === board[i + 1][j]) {
                return false;
            }
        }
    }
    return true;
}

function isWin() {
    if (isLimited) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === 2048) {
                    return true;
                }
            }
        }
    }
    return false;
}

function resetGame() {
let newBoard = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    board = newBoard;
    isLimited = false;
    notifyFinished();
    startGame();
}

function withoutLimit(btn) {
    if (isLimited === true) {
        isLimited = false;
        btn.classList.add('disabledbtn');
    }
    else {
        isLimited = true;
        btn.classList.remove('disabledbtn');
    }
}

function previousMove() {
    if (previousBoard) {
        board = cloneBoard(previousBoard);
        previousBoard = null;
        bestScore = previousBestScore;
        currentScore = previousCurrentScore;
        updateGrid();
        updateScore()
    }
}

function startGame() {
    currentScore = 0;
    addNumber();
    addNumber();
    updateGrid();
    updateScore()
}

startGame();
