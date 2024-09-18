import SimonSays from "./SimonSays";
import Inicio from "./Inicio";
import { useState } from "react";
function App() {
  const [gameStart, setGameStart] = useState(false);
  const [difficulty, setDifficulty] = useState('normal');
  const [timer, setTimer] = useState(false);
  const [theme, setTheme] = useState('normal');

  return (
    <>
      {!gameStart ? 
      (<Inicio setDifficulty = {setDifficulty} difficulty={difficulty} setTimer={setTimer} timer={timer} setGameStart={setGameStart} theme={theme} setTheme={setTheme}/>)
       : 
      (<SimonSays difficulty={difficulty} timerMode={timer} setGameStart={setGameStart} theme={theme}/>)}
      
      
    </>
  );
}

export default App;