// Styles
import styles from "./styles.module.css";

const Square = ({ value, onClick, winningSquare, lineForm }) => {
  const winningStyle = winningSquare ? styles[lineForm] : null;
  return (
    <button
      className={`${styles.square} ${
        value === "X" ? styles.x : styles.o
      } ${winningStyle}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
