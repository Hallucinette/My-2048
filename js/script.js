let board = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
];

let bestScore = 0;
let currentScore = 0;

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

function animateCell(index) {
  const squares = document.querySelectorAll('.square-class');
  const el = squares[index];
    if (!el)
        return;
        el.animate(
        [
            { transform: 'scale(1)', backgroundColor: '#cdc1b4' },
            { transform: 'scale(1.2)', backgroundColor: '#FFD700' },
            { transform: 'scale(1)', backgroundColor: '#cdc1b4' }
        ],
        { duration: 300, easing: 'ease' }
    );
}

function moveRight() {
    let isChanged = false;
    const n = board.length;

    for (let i = 0; i < n; i++) {
        const vals = board[i].filter(v => v !== 0);
        const result = Array(n).fill(0);

        let dest = n - 1;
        let j = vals.length - 1;

        while (j >= 0) {
            if (j > 0 && vals[j] === vals[j - 1]) {
                const merged = vals[j] * 2;
                result[dest] = merged;
                animateCell(i * n + dest);
                dest--;
                j -= 2;
            } else {
                result[dest] = vals[j];
                dest--;
                j--;
            }
        }

        if (board[i].toString() !== result.toString()) {
            board[i] = result;
            isChanged = true;
        }
    }

  return isChanged;
}

function moveLeft() {
    let isChanged = false;
    const n = board.length;

    for (let i = 0; i < n; i++) {
        const vals = board[i].filter(v => v !== 0);
        const result = Array(n).fill(0);

        let dest = 0;
        let j = 0;

        while (j < vals.length) {
            if (j < vals.length - 1 && vals[j] === vals[j + 1]) {
                const merged = vals[j] * 2;
                result[dest] = merged;
                animateCell(i * n + dest);
                dest++;
                j += 2;
            } else {
                result[dest] = vals[j];
                dest++;
                j++;
            }
        }

        if (board[i].toString() !== result.toString()) {
            board[i] = result;
            isChanged = true;
        }
    }
    return isChanged;
}

function moveUp() {
    let isChanged = false;
    const n = board.length;

    for (let col = 0; col < n; col++) {
        const vals = [];
        for (let row = 0; row < n; row++) {
            if (board[row][col] !== 0) vals.push(board[row][col]);
        }

        const result = Array(n).fill(0);
        let dest = 0;
        let j = 0;

        while (j < vals.length) {
            if (j < vals.length - 1 && vals[j] === vals[j + 1]) {
                const merged = vals[j] * 2;
                result[dest] = merged;
                animateCell(dest * n + col);
                dest++;
                j += 2;
            } else {
                result[dest] = vals[j];
                dest++;
                j++;
            }
        }

        for (let row = 0; row < n; row++) {
            if (board[row][col] !== result[row]) {
                board[row][col] = result[row];
                isChanged = true;
            }
        }
    }
    return isChanged;
}

function moveDown() {
    let isChanged = false;
    const n = board.length;

    for (let col = 0; col < n; col++) {
        const vals = [];
        for (let row = 0; row < n; row++) {
            if (board[row][col] !== 0) vals.push(board[row][col]);
        }

        const result = Array(n).fill(0);
        let dest = n - 1;
        let j = vals.length - 1;

        while (j >= 0) {
            if (j > 0 && vals[j] === vals[j - 1]) {
                const merged = vals[j] * 2;
                result[dest] = merged;
                animateCell(dest * n + col);
                dest--;
                j -= 2;
            } else {
                result[dest] = vals[j];
                dest--;
                j--;
            }
        }

        for (let row = 0; row < n; row++) {
            if (board[row][col] !== result[row]) {
                board[row][col] = result[row];
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
    currentScore = 0;
    addNumber();
    addNumber();
    updateGrid();
    checkScore()
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
    checkScore()
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
    checkScore()
    setTimeout(100);
    const messageElement = document.getElementById("message");
    messageElement.textContent = "You WIN!";
    alert("You WIN!");
}

startGame();
