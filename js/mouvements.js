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
