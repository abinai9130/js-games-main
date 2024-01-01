/**
 * Renders the game in the DOM
 * @param  {Element} root  element to append the game board on
 * @param  {array} board array of board pieces
 */
function renderGame(root, board) {
  const docFragment = document.createDocumentFragment();
  board.forEach((boardPiece) => {
    docFragment.appendChild(boardPiece.element);
  });

  root.appendChild(docFragment);
}

/**
 * Initiate board click listeners
 * @param  {array}   board    array of board pieces
 * @param  {Function} callback callback triggered with board piece index
 */
function initiateEventListeners(board, callback) {
  board.forEach((boardPiece, index) => {
    boardPiece.element.addEventListener("click", (e) => {
      e.preventDefault();
      callback.call(this, index);
    });
  });
}

/**
 * Update DOM board
 * @param  {Object} boardPiece { element, status }
 */
function updateBoard(boardPiece) {
  // eslint-disable-next-line no-param-reassign
  boardPiece.element.innerHTML = boardPiece.status;
}

/**
 * Check to see if there are 3 statuses in a row
 * @param  {Array} board Array of board pieces
 * @return {String|false} Returns a string of the winner ('X' or 'O') else `false` otherwise
 */
function checkForWinner(board) {
  // Check columns
  for (let i = 0; i <= 2; i += 1) {
    if (
      board[i].status !== "E" &&
      board[i].status === board[i + 3].status &&
      board[i + 3].status === board[i + 6].status
    ) {
      return board[i].status;
    }
  }

  // Check Rows
  for (let i = 0; i <= 6; i += 3) {
    if (
      board[i].status !== "E" &&
      board[i].status === board[i + 1].status &&
      board[i + 1].status === board[i + 2].status
    ) {
      return board[i].status;
    }
  }

  // Check Diagonal
  for (let i = 0, j = 4; i <= 2; i += 2, j -= 2) {
    if (
      board[i].status !== "E" &&
      board[i].status === board[i + j].status &&
      board[i + j].status === board[i + 2 * j].status
    ) {
      return board[i].status;
    }
  }

  return false;
}

/**
 * Check to see if there are any empty spots left on the board
 * @param  {Array} board Array of board pieces
 */
function boardIsFull(board) {
  const empty = board.filter((boardPiece) => boardPiece.status === "E");
  return empty.length === 0;
}

class TicTacToe {
  constructor() {
    this.currentPlayer = "X"; // X starts the game
    this.gameElement = null;
    this.board = ["E", "E", "E", "E", "E", "E", "E", "E", "E"];
  }

  init(elementID) {
    console.log("Initialize game");
    this.gameElement = document.getElementById(elementID);

    // Remap `this.board to contain an array of boardPieces { id, element, status }
    this.board = this.board.map((boardPiece, index) => ({
      id: index,
      element: document.createElement("div"),
      status: boardPiece,
    }));

    // Render game on DOM and add event listeners
    renderGame(this.gameElement, this.board);
    initiateEventListeners.call(this, this.board, this.nextTurn);
  }

  // This callback gets called when the user places a move
  nextTurn(index) {
    const clickedBoardPiece = this.board[index];

    if (clickedBoardPiece.status === "E") {
      clickedBoardPiece.status = this.currentPlayer;

      // Change to next player
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      // Update DOM
      updateBoard(clickedBoardPiece);

      const winner = checkForWinner(this.board);
      if (winner) {
        alert(`The winner is: ${winner}`);
        return;
      }

      if (boardIsFull(this.board)) {
        alert("It's a tie");
      }
    }
  }
}

export default new TicTacToe();
