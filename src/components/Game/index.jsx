import { useState } from "react";

// Components
import Board from "../Board";
import { FaUndoAlt, FaRedoAlt } from "react-icons/fa";

// Styles
import styles from "./styles.module.css";

const SIZE = 3;

function Game() {
  const [history, setHistory] = useState([Array(SIZE ** 2).fill(null)]);
  const [currentStep, setCurrentStep] = useState(0);
  const xIsNext = currentStep % 2 === 0;
  const currentSquares = history[currentStep];

  function handlePlay(newSquares) {
    const newHistory = [...history.slice(0, currentStep + 1), newSquares];
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  }

  function jumpTo(nextStep) {
    if (nextStep > history.length - 1) {
      nextStep = history.length - 1;
    }

    if (nextStep < 0) {
      nextStep = 0;
    }

    setCurrentStep(nextStep);
  }

  const steps = history.map((_, step) => {
    let desc = "Go to step #" + step;
    if (step === 0) {
      desc = "Initial game 🧧";
    }

    return (
      <li>
        <button
          className={`${styles.step} ${
            currentStep === step ? styles.current : null
          }`}
          onClick={() => jumpTo(step)}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className={styles.game}>
      <div className={styles.board}>
        <div className={styles.controls}>
          <FaUndoAlt
            className={styles.control}
            onClick={() => jumpTo(currentStep - 1)}
          />
          <FaRedoAlt
            className={styles.control}
            onClick={() => jumpTo(currentStep + 1)}
          />
        </div>
        <Board
          size={SIZE}
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className={styles.history}>
        <ol className={styles.steps}>{steps}</ol>
      </div>
    </div>
  );
}

export default Game;
