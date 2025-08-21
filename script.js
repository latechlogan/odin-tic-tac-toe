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

  return { resetGameboard, getGameboard, placeSymbol, evalGameboard };
};

const createPlayer = function (symbol) {
  const getPlayerMove = () => {
    const row = parseInt(prompt("Enter row (0-2):"));
    const col = parseInt(prompt("Enter column (0-2):"));
    return { symbol, row, col };
  };

  return { getPlayerMove };
};

const createGameflow = function () {};
