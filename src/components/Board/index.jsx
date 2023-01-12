import { useState } from "react";

// Components
import Square from "../Square";

// Styles
import styles from "./styles.module.css";

const Board = ({ size }) => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(size ** 2).fill(null));

  let status = `Next turn: ${xIsNext ? "X" : "O"}`;

  const isDraw = checkDraw(squares);
  if (isDraw) {
    status = `No one win!!!`;
  }

  const winner = findWinner(squares);
  if (winner) {
    status = `Winner: ${winner}`;
  }

  const handleClick = itemId => {
    if (squares[itemId] || winner) {
      return;
    }

    const newSquares = [...squares];
    newSquares[itemId] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
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
      <div className="status">{status}</div>
      <div className={styles.board}>{renderBoard()}</div>
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
