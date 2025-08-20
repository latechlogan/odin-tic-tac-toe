const createGameboard = function () {
  let boardPositions = [
    [["top-left"], ["top-center"], ["top-right"]], // top row
    [["mid-left"], ["mid-center"], ["mid-right"]], // middle row
    [["bot-left"], ["bot-center"], ["bot-right"]], // bottom row
  ];

  const getGameboard = () => boardPositions;

  return { getGameboard };
};

const createPlayer = function () {};

const createGameflow = function () {};

const gameboard = createGameboard();
