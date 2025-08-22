const createGameboard = function () {
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

const createPlayer = function (symbol) {
  const getPlayerMove = () => {
    const row = parseInt(prompt("Enter row (0-2):"));
    const col = parseInt(prompt("Enter column (0-2):"));
    return { symbol, row, col };
  };

  return { symbol, getPlayerMove };
};

const createGameflow = function () {
  // access to:
  // resetGameboard, getGameboard, placeSymbol
  // evalGameboard, getPlayerMove, gameboardFull
  const board = createGameboard();
  const playerOne = createPlayer("X");
  const playerTwo = createPlayer("O");
  let currentPlayer = playerOne;
  let gameOver = false;
  let winner = false;

  const makeMove = () => {
    const move = currentPlayer.getPlayerMove();
    board.placeSymbol(move.symbol, move.row, move.col);
    console.table(board.getGameboard());

    winner = board.evalGameboard();
    if (winner || board.gameboardFull()) {
      gameOver = true;
    }
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    console.log({ currentPlayer, gameOver, winner });
  };

  while (!gameOver) {
    makeMove(currentPlayer);
  }
};

const game = createGameflow();
