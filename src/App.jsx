import { useState } from "react";

// Components
import Game from "./components/Game";

function App() {
  const [version, setVersion] = useState(0);

  return (
    <>
      <Game key={version} />
      <button className="reset" onClick={() => setVersion(version + 1)}>
        Reset
      </button>
    </>
  );
}

export default App;
