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

  const assignValue = (value, row, index) => {
    boardPositions[row][index] = value;
  };

  return { resetGameboard, getGameboard, assignValue };
};

const createPlayer = function () {};

const createGameflow = function () {};

// intialize for testing/previewing in browser
const gameboard = createGameboard();

gameboard.resetGameboard();
gameboard.assignValue("x", 1, 1);
gameboard.assignValue("o", 0, 0);
console.log(gameboard.getGameboard());
