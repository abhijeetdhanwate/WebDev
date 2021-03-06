const statusDisplay = document.querySelector(".game-status");
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(cellClicked, cellClickedIndex) {
    gameState[cellClickedIndex] = currentPlayer;
    cellClicked.innerHTML = currentPlayer;
    console.log(gameState)
}

function handlePlayerChange() {
    currentPlayer = currentPlayer==="X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleResultValidation() {
    let roundWon = false;
    for (let i=0; i<=7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a==="" || b==="" || c==="") {
            continue;
        }

        if (a===b && b===c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon){
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let gameDrawn = !gameState.includes("");
    if (gameDrawn){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(cellClickedEvent) {
    const cellClicked = cellClickedEvent.target;
    const cellClickedIndex = parseInt(cellClicked.getAttribute('data-cell-index'));

    if (gameState[cellClickedIndex] !== "" || !gameActive){
        return;
    }

    handleCellPlayed(cellClicked, cellClickedIndex);
    handleResultValidation();
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
    statusDisplay.innerHTML = currentPlayerTurn();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart-game').addEventListener('click', handleRestartGame);

