const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const sizeInput = document.getElementById('size-input');
const resizeBtn = document.getElementById('resize-btn');
let currentPlayer = 'X';
let score = 0;
let currentWins = 0;
let boardSize = parseInt(sizeInput.value) || 5;

initializeBoard();

function initializeBoard() {
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${boardSize}, 50px)`;
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const cell = event.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        if (checkWin()) {
            score++;
            currentWins++;
            scoreDisplay.textContent = `Счет игры: ${score}, Серия: ${currentWins}`;
            resetBoard();
        } else if (isBoardFull()) {
            currentWins = 0;
            scoreDisplay.textContent = `Счет игры: ${score}, Серия: ${currentWins}`;
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const cells = document.querySelectorAll('.cell');

    // Check rows
    for (let i = 0; i < boardSize; i++) {
        let row = '';
        for (let j = 0; j < boardSize; j++) {
            row += cells[i * boardSize + j].textContent;
        }
        if (row === 'XXX' || row === 'OOO') return true;
    }

    // Check columns
    for (let i = 0; i < boardSize; i++) {
        let col = '';
        for (let j = 0; j < boardSize; j++) {
            col += cells[j * boardSize + i].textContent;
        }
        if (col === 'XXX' || col === 'OOO') return true;
    }

    // Check diagonals
    let diag1 = '';
    let diag2 = '';
    for (let i = 0; i < boardSize; i++) {
        diag1 += cells[i * boardSize + i].textContent;
        diag2 += cells[i * boardSize + (boardSize - 1 - i)].textContent;
    }
    if (diag1 === 'XXX' || diag1 === 'OOO' || diag2 === 'XXX' || diag2 === 'OOO') return true;

    return false;
}

function isBoardFull() {
    const cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        if (cell.textContent === '') return false;
    }
    return true;
}

function resetBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

resizeBtn.addEventListener('click', function () {
    boardSize = parseInt(sizeInput.value) || 5;
    initializeBoard();
    currentWins = 0;
    score = 0;
    scoreDisplay.textContent = `Счет игры: ${score}, Серия: ${currentWins}`;
});