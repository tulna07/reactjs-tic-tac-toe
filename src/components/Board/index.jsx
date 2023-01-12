import { useState } from "react";

// Components
import Square from "../Square";

// Styles
import styles from "./styles.module.css";

const Board = ({ size, xIsNext, squares, onPlay }) => {
  let status = `Next turn: ${xIsNext ? "X" : "O"}`;

  const isDraw = checkDraw(squares);
  if (isDraw) {
    status = `No one win!!!`;
  }

  const [winner, winningLine, lineForm] = findWinner(squares);
  if (winner) {
    status = `Winner: ${winner}`;
  }

  const handleClick = itemId => {
    if (squares[itemId] || winner) {
      return;
    }

    const newSquares = [...squares];
    newSquares[itemId] = xIsNext ? "X" : "O";
    onPlay(newSquares);
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < size; row++) {
      const rowItems = [];
      for (let col = 0; col < size; col++) {
        const itemId = row * size + col;
        rowItems.push(
          <Square
            key={itemId}
            winningSquare={winningLine?.includes(itemId)}
            lineForm={lineForm}
            value={squares[itemId]}
            onClick={() => handleClick(itemId)}
          />
        );
      }
      board.push(
        <div key={row} className={styles.row}>
          {rowItems}
        </div>
      );
    }
    return board;
  };

  return (
    <>
      <div className={styles.board}>{renderBoard()}</div>
      <div className={styles.status}>{status}</div>
    </>
  );
};

function checkDraw(squares) {
  for (const square of squares) {
    if (!square) {
      return false;
    }
  }
  return true;
}

function findWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const lineForm = {
    1: "horizontal",
    2: "to-left-diagonal",
    3: "vertical",
    4: "to-right-diagonal",
  };

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i], lineForm[b - a]];
    }
  }
  return [null, null, null];
}

export default Board;
