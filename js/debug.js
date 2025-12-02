
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
        [1024,0,0,0],
        [1024,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

    board = newBoard;
    updateGrid();
    checkScore()
}
