const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Combinaciones ganadoras
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Manejar clics en las celdas
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");

        if (board[index] !== "" || !gameActive) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            statusText.textContent = `¡${currentPlayer} gana!`;
            gameActive = false;
        } else if (board.includes("")) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Turno de ${currentPlayer}`;
        } else {
            statusText.textContent = "¡Empate!";
            gameActive = false;
        }
    });
});

// Reiniciar el juego
resetButton.addEventListener("click", () => {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Turno de X";
    cells.forEach(cell => cell.textContent = "");
});

// Verificar si hay ganador
function checkWinner() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
