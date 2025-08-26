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
    if (gameboard[row][col] === null) {
      gameboard[row][col] = symbol;
      return true;
    } else {
      return false;
    }
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
  let playerName;

  const setPlayerName = (name) => {
    playerName = name;
  };

  const getPlayerName = () => playerName;

  return { symbol, setPlayerName, getPlayerName };
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

  const resetStateValues = () => {
    currentPlayer = playerOne;
    gameboardFull = false;
    gameOver = false;
    haveWinner = false;
    winner = null;
  };

  const updateWin = () => (haveWinner = board.evalGameboard());

  const updateGameboardFull = () => (gameboardFull = board.gameboardFull());

  const updateCurrentPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const getWinner = () => winner;

  const getGameOverStatus = () => gameOver;

  const handleEndgame = () => {
    gameOver = true;

    if (haveWinner) {
      winner = currentPlayer.getPlayerName();
    } else {
      winner = "Cat";
    }
  };

  const handleTurn = (row, col) => {
    const moveSuccessful = board.placeSymbol(currentPlayer.symbol, row, col);

    if (!moveSuccessful) return;

    updateWin();
    updateGameboardFull();
    if (haveWinner || gameboardFull) {
      handleEndgame();
      return;
    }
    updateCurrentPlayer();
  };

  return {
    board,
    playerOne,
    playerTwo,
    resetStateValues,
    getGameOverStatus,
    getWinner,
    handleTurn,
  };
};

const displayController = () => {
  let game = gameflowController();
  const viewBoard = document.querySelector(".board");
  const viewSpaces = Array.from(document.querySelectorAll(".board__space"));
  const dialogNames = document.querySelector(".dialog-names");
  const dialogWin = document.querySelector(".dialog-win");
  const winOutput = document.querySelector(".win-output");

  const addPlayerNames = function () {
    dialogNames.showModal();
    document.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      const playerNameX = document.querySelector("#player-name-x").value;
      const playerNameO = document.querySelector("#player-name-o").value;
      if (playerNameX) {
        game.playerOne.setPlayerName(playerNameX);
      } else {
        game.playerOne.setPlayerName("Player 1");
      }
      if (playerNameO) {
        game.playerTwo.setPlayerName(playerNameO);
      } else {
        game.playerTwo.setPlayerName("Player 2");
      }
      addNameToView(
        game.playerOne.getPlayerName(),
        game.playerTwo.getPlayerName()
      );
      dialogNames.close();
    });
  };

  const addNameToView = (nameX, nameO) => {
    document.querySelector(".players__name-x").textContent = `X: ${nameX}`;
    document.querySelector(".players__name-o").textContent = `O: ${nameO}`;
  };

  const displayGameboard = (element) => {
    element.textContent =
      game.board.getGameboard()[element.dataset.row][element.dataset.col];
  };

  const clearGameboard = () => {
    game.board.resetGameboard();
    viewSpaces.forEach((space) => (space.innerHTML = ""));
  };

  viewBoard.addEventListener("click", function (e) {
    game.handleTurn(e.target.dataset.row, e.target.dataset.col);
    displayGameboard(e.target);
    if (game.getGameOverStatus()) {
      winOutput.textContent = `${game.getWinner()} wins!`;
      dialogWin.showModal();
    }
  });

  const handlePlayAgain = () => {
    clearGameboard();
    game.resetStateValues();
    dialogWin.close();
  };

  const handleNewGame = () => {
    clearGameboard();
    game.resetStateValues();
    dialogWin.close();
    addPlayerNames();
  };

  document
    .querySelector(".display-mode")
    .addEventListener("click", function () {
      const root = document.querySelector("html");
      const btn = document.querySelector(".display-mode");

      if (root.dataset.theme === "light") {
        root.dataset.theme = "dark";
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      } else {
        root.dataset.theme = "light";
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      }
    });

  document
    .querySelector(".dialog-again")
    .addEventListener("click", handlePlayAgain);

  document
    .querySelector(".dialog-newgame")
    .addEventListener("click", handleNewGame);

  document.querySelector(".new-game").addEventListener("click", function () {
    handleNewGame();
  });

  document.querySelector(".reset-game").addEventListener("click", function () {
    handlePlayAgain();
  });
};

displayController();
