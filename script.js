const createGameboard = function () {
  let boardPositions = [
    ["top-left", "top-center", "top-right"], // top row
    ["mid-left", "mid-center", "mid-right"], // middle row
    ["bot-left", "bot-center", "bot-right"], // bottom row
  ];

  const resetGameboard = () => {
    boardPositions = [
      [null, null, null], // top row
      [null, null, null], // middle row
      [null, null, null], // bottom row
    ];
  };

  const getGameboard = () => boardPositions;

  const assignValue = (value, row, col) => {
    boardPositions[row][col] === null
      ? (boardPositions[row][col] = value)
      : alert(`Sorry, that spot is taken.`);
  };

  const evalGameboard = () => {
    for (let i = 0; i < 3; i++) {
      if (
        boardPositions[i][0] === boardPositions[i][1] &&
        boardPositions[i][1] === boardPositions[i][2]
      ) {
        console.log("Winner!");
        // handleWinner
      }

      if (
        boardPositions[0][i] === boardPositions[1][i] &&
        boardPositions[1][i] === boardPositions[2][i]
      ) {
        console.log("Winner!");
        // handleWinner
      }
    }

    if (
      boardPositions[0][0] === boardPositions[1][1] &&
      boardPositions[1][1] === boardPositions[2][2]
    ) {
      console.log("Winner!");
      // handleWinner
    }

    if (
      boardPositions[0][2] === boardPositions[1][1] &&
      boardPositions[1][1] === boardPositions[2][0]
    ) {
      console.log("Winner!");
      // handleWinner
    }
  };

  return { resetGameboard, getGameboard, assignValue, evalGameboard };
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

// intialize for testing/previewing in browser
const gameboard = createGameboard();

gameboard.resetGameboard();
gameboard.assignValue("x", 1, 1);
gameboard.assignValue("o", 0, 1);
gameboard.assignValue("x", 1, 2);
gameboard.assignValue("o", 0, 0);
gameboard.assignValue("x", 2, 1);
gameboard.evalGameboard();
// gameboard.assignValue("o", 0, 2);
// gameboard.evalGameboard();
console.log(gameboard.getGameboard());
