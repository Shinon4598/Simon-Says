import { useEffect, useState } from 'react'
import Button from './Components/button';
import './App.css';


function SimonSays({difficulty, timerMode, setGameStart, theme} ) {
  const [ActiveColor, setActiveColor] = useState(null); //El color que se esta mostrando
  const [sequence, setSequence] = useState([]); //La secuencia de colores
  const [userTurn, setUserTurn] = useState(false); //Si es el  turno del jugador
  const [userSequence, setUserSequence] = useState([]); //La secuencia del jugador
  const [gameOver, setGameOver] = useState(false); //Si el juego termino
  const [round, setRound] = useState(0); //La ronda actual
  const [isCorrect, setIsCorrect] = useState(false); 
  const [waiting, setWaiting] = useState(false); //Pausa entre la interacción del usuario y cuando se muestra la secuencia de colores
  const [bestScore, setBestScore] = useState(0); 
  const [timeLeft, setTimeLeft] = useState(10);
  const [timer, setTimer] = useState(null);

  
  const difficultyTimer = {
    easy: 800,
    normal: 500,
    hard: 300
  }
  
  const colors = ['red', 'yellow', 'green', 'blue'];
  const sounds = {
    red: new Audio('/red.mp3'),
    yellow: new Audio ('/yellow.mp3'),
    green: new Audio('/green.mp3'),
    blue: new Audio ('/blue.mp3'),
    gameFail: new Audio ('/game-fail.mp3'),
    correct: new Audio ('/correct.mp3'),
  }
  //Reproducir sonido
  const playSound = (color) => {
    if (sounds[color]) {
      const audio = sounds[color];
      audio.playbackRate = 800 / difficultyTimer[difficulty];
      audio.play();
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, difficultyTimer[difficulty] - 100);
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

    if (timerMode) {
      NewTimer();
    }
  }
  //Ilumina las celdas de colores de la sequencia de sequence
  const ShowActiveColor = () => {
    setUserTurn(false);
    let index = 0;
    console.log(difficultyTimer[difficulty])
    const interval = setInterval(() => {
      if (index < sequence.length) {
        paraaaLoca();
        setActiveColor(sequence[index]);
          setTimeout(() => {
            setActiveColor(-1);
          }, difficultyTimer[difficulty] - 100);
        console.log(colors[sequence[index]])
        playSound(colors[sequence[index]]);
        index++;
      }
      else{
        setActiveColor(-1);
        clearInterval(interval);
        setUserTurn(true);
        if (timer) {
          NewTimer();
        }
      }
    },difficultyTimer[difficulty]);
  }


  const calcLeftTime = (difficulty, sequenceLength) => {
    let baseTime;
    let extraTimePerColor;
  
    switch (difficulty) {
      case 'easy':
        baseTime = 10; // Tiempo base para dificultad fácil
        extraTimePerColor = 2; // Tiempo extra por cada color en la secuencia
        break;
      case 'normal':
        baseTime = 7; // Tiempo base para dificultad normal
        extraTimePerColor = 1.5; // Tiempo extra por color
        break;
      case 'hard':
        baseTime = 5; // Tiempo base para dificultad difícil
        extraTimePerColor = 1; // Tiempo extra por color
        break;
      default:
        baseTime = 10; // Valor por defecto
        extraTimePerColor = 2; 
    }
  
    // tiempo base + tiempo por cada color en la secuencia
    const totalTime = baseTime + (sequenceLength * extraTimePerColor);
    return totalTime;
  }

  const NewTimer = () => {
    setTimeLeft(calcLeftTime(difficulty, sequence.length));
    const intervalo = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            sounds.gameFail.play();
            setGameOver(true);
            paraaaLoca();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimer(intervalo);
  }
  const paraaaLoca = () => {
    clearInterval(timer);
  }
  // Manejar el click de los botones para verificar si es correcto
  const handleClick = (color) => {
    if (!userTurn || waiting || gameOver) return;
-
    setActiveColor(color);
    setUserSequence([...userSequence, color]);

    playSound(colors[color]);

    //Se debe crear una variable si no por la asincronia no se puede comparar el valor de userSequence con sequence
    const newSequence = [...userSequence, color];

    const isMatch = newSequence.every((value, index) => value === sequence[index]);
    
    console.log(isMatch + " : " + newSequence + " / " + sequence);
  
    if (!isMatch) {
      setGameOver(true);
      setIsCorrect(false);
      setSequence([]);
      setUserSequence([]);
      setActiveColor(null);
      return;
    }

    if (newSequence.length === sequence.length) {
      paraaaLoca();
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
    if (gameOver) {
      sounds.gameFail.play();
    }
  }, [gameOver]);
  useEffect(() => {
    if (round > 0 && isCorrect) {
      setWaiting(true);
      sounds.correct.play();
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
      {gameOver ? (
        <div className="game-over">
          <h1 className="game-over__title">Game Over</h1>
          <p className="game-over__text">Your score is: {round}</p>
          <button className="game-over__button" onClick={()=>setGameStart(false)}>Try again</button>
        </div>
      ):(
      <>
      {
      timerMode && (<p className="score">Time Left : {timeLeft}</p>)}
      <a className='flecha_atras'  href='/'>🢘</a>
      <div className='simon-container'>
        <div className={`simon-buttons_container ${theme}`}>
          {
              colors.map((color, index) => (
                <Button 
                  key={index}
                  Active= {index == ActiveColor}
                  color={color} 
                  time={difficultyTimer[difficulty]}
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
        <p>BEST SCORE : {bestScore}</p>
      </div>
      </>
    )}
    </>
  )
}

export default SimonSays;
