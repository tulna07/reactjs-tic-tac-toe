import { useState } from "react";

// Components
import Board from "./components/Board";

function App() {
  const [version, setVersion] = useState(0);

  return (
    <>
      <Board key={version} size={3} />
      <button className="btn-reset" onClick={() => setVersion(version + 1)}>
        Reset
      </button>
    </>
  );
}

export default App;
