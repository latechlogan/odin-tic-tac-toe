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
  const getPlayerMove = () => {
    const row = parseInt(prompt("Enter row (0-2):"));
    const col = parseInt(prompt("Enter column (0-2):"));
    return { symbol, row, col };
  };

  return { symbol, getPlayerMove };
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

  const makeMove = () => {
    const move = currentPlayer.getPlayerMove();
    board.placeSymbol(move.symbol, move.row, move.col);
  };

  const updateWin = () => {
    haveWinner = board.evalGameboard();
  };

  const updateGameboardFull = () => {
    gameboardFull = board.gameboardFull();
  };

  const updateCurrentPlayer = () => {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  };

  const displayGameboard = () => {
    console.table(board.getGameboard());
  };

  const handleEndgame = () => {
    gameOver = true;

    if (haveWinner) {
      winner = currentPlayer.symbol;
    } else {
      winner = "Cat";
    }

    console.log(`${winner} wins!`);
  };

  const handleTurn = () => {
    makeMove(currentPlayer);
    displayGameboard();
    updateWin();
    updateGameboardFull();
    if (haveWinner || gameboardFull) {
      handleEndgame();
      return;
    }
    updateCurrentPlayer();
  };

  // while (!gameOver) {
  //   handleTurn();
  // }

  return { board };
};

const game = gameflowController();
