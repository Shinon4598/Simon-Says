import SimonSays from "./SimonSays";
import Inicio from "./Inicio";
import { useState } from "react";
function App() {
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(['easy', 'normal', 'hard']);

  return (
    <>
      {!gameOver ? 
      (<Inicio />)
       : 
      (<SimonSays />)}
      
      
    </>
  );
}

export default App;