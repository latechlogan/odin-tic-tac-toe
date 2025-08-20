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
    boardPositions[row][index] === null
      ? (boardPositions[row][index] = value)
      : alert(`Sorry, that spot is taken.`);
  };

  return { resetGameboard, getGameboard, assignValue };
};

const createPlayer = function () {};

const createGameflow = function () {};

// intialize for testing/previewing in browser
const gameboard = createGameboard();

gameboard.resetGameboard();
gameboard.assignValue("x", 1, 1);
gameboard.assignValue("o", 1, 1);
console.log(gameboard.getGameboard());
