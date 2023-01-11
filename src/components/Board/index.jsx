import { useState } from "react";

// Components
import Square from "../Square";

// Styles
import styles from "./styles.module.css";

const Board = ({ size }) => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(size ** 2).fill(null));

  const handleClick = itemId => {
    if (squares[itemId]) {
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

  return <div className={styles.board}>{renderBoard()}</div>;
};

export default Board;
