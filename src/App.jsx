import SimonSays from "./SimonSays";
import Inicio from "./Inicio";
import { useState } from "react";
function App() {
  const [gameStart, setGameStart] = useState(false);
  const [difficulty, setDifficulty] = useState('normal');
  const [timer, setTimer] = useState(false);

  return (
    <>
      {!gameStart ? 
      (<Inicio setDifficulty = {setDifficulty} difficulty={difficulty} setTimer={setTimer} timer={timer} setGameStart={setGameStart}/>)
       : 
      (<SimonSays difficulty={difficulty} timerMode={timer} setGameStart={setGameStart}/>)}
      
      
    </>
  );
}

export default App;