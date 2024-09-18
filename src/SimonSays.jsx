import { useEffect, useState } from 'react'
import Button from './Components/button';
import './App.css';

function SimonSays() {
  const [ActiveColor, setActiveColor] = useState(null); //El color que se esta mostrando
  const [sequence, setSequence] = useState([]); //La secuencia de colores
  const [userTurn, setUserTurn] = useState(false); //Si es el  turno del jugador
  const [userSequence, setUserSequence] = useState([]); //La secuencia del jugador
  const [gameOver, setGameOver] = useState(false); //Si el juego termino
  const [round, setRound] = useState(0); //La ronda actual
  const [isCorrect, setIsCorrect] = useState(false); 
  const [waiting, setWaiting] = useState(false); //Pausa entre la interacción del usuario y cuando se muestra la secuencia de colores
  const [bestScore, setBestScore] = useState(0); 
  
  const colors = ['red', 'yellow', 'green', 'blue'];
  const sounds = {
    red: new Audio('/red.mp3'),
    yellow: new Audio ('/yellow.mp3'),
    green: new Audio('/green.mp3'),
    blue: new Audio ('/blue.mp3'),
    end: new Audio ('/end.mp3')
  }
  //Reproducir sonido
  const playSound = (color) => {
    if (sounds[color]) {
      sounds[color].play();
    }
  }
  //Obtener un nuevo color aleatorio
  function getRandomColor() { 
    return Math.floor(Math.random() * colors.length);
  }
  //Iniciar el juego
  const startGame = () => {
    setSequence([getRandomColor()]);
    setUserTurn(false);
    setRound(1);
    setIsCorrect(true);
    setGameOver(false);
  }
  //Ilumina las celdas de colores de la sequencia de sequence
  const ShowActiveColor = () => {
    setUserTurn(false);
    let index = 0;
    const interval = setInterval(() => {
      if (index < sequence.length) {
        setActiveColor(sequence[index]);
        console.log(colors[sequence[index]])
        playSound(colors[sequence[index]]);
        index++;
      }
      else{
        setActiveColor(-1);
        clearInterval(interval);
        setUserTurn(true);
      }
    }, 800);
  }

  // Manejar el click de los botones para verificar si es correcto
  const handleClick = (color) => {
    if (!userTurn || waiting) return;
-
    setActiveColor(color);
    setUserSequence([...userSequence, color]);

    playSound(colors[color]);

    //Se debe crear una variable si no por la asincronia no se puede comparar el valor de userSequence con sequence
    const newSequence = [...userSequence, color];

    const isMatch = newSequence.every((value, index) => value === sequence[index]);
    
    console.log(isMatch + " : " + newSequence + " / " + sequence);
  
    if (!isMatch) {
      playSound(sounds['end']);
      alert('Perdiste');
      setGameOver(true);
      setIsCorrect(false);
      setSequence([]);
      setUserSequence([]);
      setActiveColor(null);
      return;
    }

    if (newSequence.length === sequence.length) {
      setSequence([...sequence, getRandomColor()]);
      setUserSequence([]);
      setUserTurn(false);
      setRound(round + 1);
      if (round + 1 > bestScore) {
        updateScore(round + 1);
      }
      setIsCorrect(true);
    }
    setTimeout(() => {
      setActiveColor(-1);
    }, 500);
  };
  

  useEffect(() => {
    if (round > 0 && isCorrect) {
      setWaiting(true);
      setTimeout(() => {
        setWaiting(false);
        setActiveColor(-1); // Restablecer ActiveColor antes de mostrar la secuencia
        ShowActiveColor();
      }, 1000);
    }
  }, [sequence]);

  //Best Score local host 
  useEffect(()=>{
    const storedBestScore = localStorage.getItem('bestScore');
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore, 10))
    }
  }, []);

  function updateScore(newScore) {
    if (newScore > bestScore) {
      setBestScore(newScore);
      localStorage.setItem('bestScore', newScore);
    }
  }
  
  return (
    <>
      {/* {gameOver && <h1>Game Over</h1>} */}
      <div className='simon-container'>
        <div className='simon-buttons_container'>
          {
              colors.map((color, index) => (
                <Button 
                  key={index}
                  Active= {index == ActiveColor}
                  color={color} 
                  onClick = {() => handleClick(index, color)}>
                </Button>
              ))  
          }
        </div>
        <div className={`button-middle_container ${waiting ? 'waiting' : ''}`}>
          <button className="button-middle" onClick={startGame}>
            {
              (<span className="button-middle_text ">{waiting && round <= 1 ? '🍀' : waiting ? '✔' : round}</span>)
            }
            
          </button>
        </div>
      </div>
      <div className="score">
        <p>Best Score: {bestScore}</p>
      </div>
      
    </>
  )
}

export default SimonSays;
