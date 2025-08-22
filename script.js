const createGameboard = function () {
  let gameboard = [
    ["X", "X", "X"],
    ["X", null, "X"],
    ["X", "X", "X"],
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
        gameboard[i][1] === gameboard[i][2]
      ) {
        console.log("Winner!");
        // handleWinner
      }

      if (
        gameboard[0][i] === gameboard[1][i] &&
        gameboard[1][i] === gameboard[2][i]
      ) {
        console.log("Winner!");
        // handleWinner
      }
    }

    if (
      gameboard[0][0] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][2]
    ) {
      console.log("Winner!");
      // handleWinner
    }

    if (
      gameboard[0][2] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][0]
    ) {
      console.log("Winner!");
      // handleWinner
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
  let winner = null;

  const makeMove = () => {
    console.log(board.gameboardFull());
    const move = currentPlayer.getPlayerMove();
    board.placeSymbol(move.symbol, move.row, move.col);

    // check for winner
    gameOver = board.gameboardFull();
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    console.log(board.gameboardFull());
  };

  makeMove(currentPlayer);
};

const game = createGameflow();
