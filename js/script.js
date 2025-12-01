let board = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];


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
    const squares = document.querySelectorAll('.square-class');
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

function moveRight() {
    let isChanged = false;
    for (let i = 0; i < board.length; i++) {
        let row = board[i].filter(nb => nb !== 0);
        console.log("Ligne", i, "après compactage :", row);
        for (let j = row.length - 1; j > 0; j--) {
            if (row[j] === row[j - 1]) {
                row[j - 1] *= 2;
                row[j] = 0;
                j--;
            }
        }

        row = row.filter(val => val !== 0);

        while (row.length < board.length) {
            row.unshift(0);
        }
        if (board[i].toString() !== row.toString()) {
            board[i] = row;
            isChanged = true;
        }
    }
    return isChanged;
}

function moveLeft() {
    let isChanged = false;
    for (let i = 0; i < board.length; i++) {
        let row = board[i].filter(nb => nb !== 0);
        console.log("Ligne", i, "après compactage :", row);
        for (let j = 0; j < row.length - 1; j++) {
            if (row[j] === row[j + 1]) {
                row[j + 1] *= 2;
                row[j] = 0;
                j++;
            }
        }

        row = row.filter(val => val !== 0);

        while (row.length < board.length) {
            row.push(0);
        }
        if (board[i].toString() !== row.toString()) {
            board[i] = row;
            isChanged = true;
        }
    }
    return isChanged;
}

function moveUp() {
    let isChanged = false;
    for (let col = 0; col < board.length; col++) {
        let column = [];
        for (let row = 0; row < board.length; row++) {
            if (board[row][col] !== 0) {
                column.push(board[row][col]);
            }
        }

        for (let j = 0; j < column.length - 1; j++) {
            if (column[j] === column[j + 1]) {
                column[j] *= 2;
                column[j + 1] = 0;
                isChanged = true;
                j++;
            }
        }

        column = column.filter(val => val !== 0);

        while (column.length < board.length) {
            column.push(0);
        }

        for (let row = 0; row < board.length; row++) {
            if (board[row][col] !== column[row]) {
                board[row][col] = column[row];
                isChanged = true;
            }
        }
    }
    return isChanged;
}

function moveDown() {
    let isChanged = false;
    for (let col = 0; col < board.length; col++) {
        let column = [];
        for (let row = 0; row < board.length; row++) {
            if (board[row][col] !== 0) {
                column.push(board[row][col]);
            }
        }

        for (let j = column.length - 1; j > 0; j--) {
            if (column[j] === column[j - 1]) {
                column[j] *= 2;
                column[j - 1] = 0;
                isChanged = true;
                j--;
            }
        }

        column = column.filter(val => val !== 0);

        while (column.length < board.length) {
            column.unshift(0);
        }

        for (let row = 0; row < board.length; row++) {
            if (board[row][col] !== column[row]) {
                board[row][col] = column[row];
                isChanged = true;
            }
        }
    }
    return isChanged;
}

function checkGame() {
    let isFinished = isFinish();
    const messageElement = document.getElementById("message");

    if (isFinished) {
        messageElement.textContent = "You lost!";
        alert("You lost!");
    } else {
        messageElement.textContent = "";
    }
}

function checkScore() {
    let bestScore = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] > bestScore) {
                bestScore = board[i][j];
            }
        }
    }

    const messageElement = document.getElementById("score");
    messageElement.textContent = "Best score : " + bestScore.toString();
}

document.addEventListener('keydown', (event) => {
    let isChanged = false;
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
        checkScore();
        updateGrid();
    }
});

document.addEventListener("keydown", function(event) {
    checkGame();
});

function isFinish() {
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

function startGame() {
    addNumber();
    addNumber();
    updateGrid();
}

function resetGame() {
let newBoard = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
    ];
    board = newBoard;
    startGame();
}

function lostGame() {
let newBoard = [
    [2,4,16,32],
    [4,16,32,2],
    [16,32,2,4],
    [32,2,4,16]
    ];
    board = newBoard;
    updateGrid();
    checkGame();
}

function winGame() {
let newBoard = [
    [2048,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
    ];
    board = newBoard;
    updateGrid();
    const messageElement = document.getElementById("message");
    messageElement.textContent = "You WIN!";
    alert("You WIN!");
}

startGame();
