const createGameboard = function () {
  let boardPositions = [
    ["top-left", "top-center", "top-right"], // top row
    ["mid-left", "mid-center", "mid-right"], // middle row
    ["bot-left", "bot-center", "bot-right"], // bottom row
  ];

  const getGameboard = () => boardPositions;

  const resetGameboard = () => {
    boardPositions = [
      [null, null, null], // top row
      [null, null, null], // middle row
      [null, null, null], // bottom row
    ];
  };

  return { getGameboard, resetGameboard };
};

const createPlayer = function () {};

const createGameflow = function () {};

// intialize for testing/previewing in browser
const gameboard = createGameboard();

gameboard.resetGameboard();
console.log(gameboard.getGameboard());
