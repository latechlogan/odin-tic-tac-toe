const gameboardController = function () {
  let gameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const resetGameboard = () => {
    gameboard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  };

  const getGameboard = () => gameboard;

  const placeSymbol = (symbol, row, col) => {
    gameboard[row][col] === null
      ? (gameboard[row][col] = symbol)
      : alert(`Sorry, that spot is taken.`);
  };

  const evalGameboard = () => {
    for (let i = 0; i < 3; i++) {
      if (
        gameboard[i][0] === gameboard[i][1] &&
        gameboard[i][1] === gameboard[i][2] &&
        gameboard[i][0] !== null
      ) {
        return true;
      }

      if (
        gameboard[0][i] === gameboard[1][i] &&
        gameboard[1][i] === gameboard[2][i] &&
        gameboard[0][i] !== null
      ) {
        return true;
      }
    }

    if (
      gameboard[0][0] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][2] &&
      gameboard[0][0] !== null
    ) {
      return true;
    }

    if (
      gameboard[0][2] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][0] &&
      gameboard[0][2] !== null
    ) {
      return true;
    }
  };

  const gameboardFull = () => !gameboard.some((row) => row.includes(null));

  return {
    resetGameboard,
    getGameboard,
    placeSymbol,
    evalGameboard,
    gameboardFull,
  };
};

const playerController = function (symbol) {
  return { symbol };
};

const gameflowController = function () {
  const board = gameboardController();
  const playerOne = playerController("X");
  const playerTwo = playerController("O");
  let currentPlayer = playerOne;
  let gameboardFull = false;
  let gameOver = false;
  let haveWinner = false;
  let winner = null;

  const updateWin = () => {
    haveWinner = board.evalGameboard();
  };

  const updateGameboardFull = () => {
    gameboardFull = board.gameboardFull();
  };

  const updateCurrentPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const getWinner = () => {
    return winner;
  };

  const getGameOverStatus = () => {
    return gameOver;
  };

  const handleEndgame = () => {
    gameOver = true;

    if (haveWinner) {
      winner = currentPlayer.symbol;
    } else {
      winner = "Cat";
    }
  };

  const handleTurn = (row, col) => {
    board.placeSymbol(currentPlayer.symbol, row, col);
    updateWin();
    updateGameboardFull();
    if (haveWinner || gameboardFull) {
      handleEndgame();
      return;
    }
    updateCurrentPlayer();
  };

  return { board, getGameOverStatus, getWinner, handleTurn };
};

const displayController = (function () {
  const game = gameflowController();
  const viewBoard = document.querySelector(".board");
  const viewSpaces = Array.from(document.querySelectorAll(".board__space"));
  const dialog = document.querySelector("dialog");
  const winOutput = document.querySelector(".win-output");

  const displayGameboard = (element) => {
    console.table(game.board.getGameboard());
    element.innerHTML = "";
    element.textContent =
      game.board.getGameboard()[element.dataset.row][element.dataset.col];
  };

  viewBoard.addEventListener("click", function (e) {
    game.handleTurn(e.target.dataset.row, e.target.dataset.col);
    displayGameboard(e.target);
    if (game.getGameOverStatus()) {
      winOutput.innerHTML = "";
      winOutput.textContent = `${game.getWinner()} wins!`;
      dialog.showModal();
      viewSpaces.forEach((space) => (space.innerHTML = ""));
    }
  });

  document.querySelector(".dialog-yes").addEventListener("click", function () {
    dialog.close();
  });

  document.querySelector(".dialog-no").addEventListener("click", function () {
    dialog.close();
  });
})();
