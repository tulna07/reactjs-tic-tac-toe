// Styles
import styles from "./styles.module.css";

const Square = ({ value, onClick }) => {
  return (
    <button
      className={`${styles.square} ${value === "X" ? styles.x : styles.o}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
