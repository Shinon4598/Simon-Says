import { useState } from "react";
import './Inicio.css'
import Titulo from "./Components/Titulo";

export default function Inicio({setDifficulty, difficulty, setTimer, timer, setGameStart, theme, setTheme}) {

    const handleDifficulty = (e) => {
        setDifficulty(e.target.value);
    }
    const handleStart = () => {
        const audioStart = new Audio('/start.mp3');
        audioStart.play();
        setGameStart(true);
    }
    const handleTheme = (e) => {
        setTheme(e.target.value);
    }
    const tituloJuego = 'SIMON SAYS';
    const colores = ['green', 'red', 'yellow', 'blue'];
    return(
        <div>
            <h1 className="titulo">
                {tituloJuego.split('').map((letra, index)=>(
                    <Titulo key={index} color={colores[index%4]} letra={letra}/>
                ))}
            </h1>
            <button className="button-start" onClick={handleStart}>►</button>
            <p>Difficulty</p>
            <div className="difficulty-container">
                
                    <input 
                        id="easy"
                        type="radio" 
                        name="difficulty"
                        value="easy"
                        checked={difficulty === 'easy'}
                        onChange={handleDifficulty}
                        /> 
                <label htmlFor="easy">
                    Easy
                </label>
                    <input 
                        id="normal"
                        type="radio" 
                        name="difficulty" 
                        value="normal"
                        checked={difficulty === 'normal'}
                        onChange={handleDifficulty}
                        />
                <label htmlFor="normal">
                Normal
                </label>
                
                    <input 
                        id="hard"
                        type="radio"
                        name="difficulty"
                        value="hard"
                        checked={difficulty === 'hard'}
                        onChange={handleDifficulty}
                        /> 
                <label 
                    htmlFor="hard"> Hard
                </label>
            </div>
            
            <p>Theme</p>
                <div className="theme-container">
                        <input 
                            id="normalTheme"
                            type="radio" 
                            name="theme"
                            value="normal"
                            checked={theme === 'normal'}
                            onChange={handleTheme}
                            /> 
                    <label htmlFor="normalTheme">
                        Normal
                    </label>
                        <input 
                            id="highContrast"
                            type="radio" 
                            name="theme" 
                            value="highContrast"
                            checked={theme === 'highContrast'}
                            onChange={handleTheme}
                            />
                    <label htmlFor="highContrast">
                    High Contrast
                    </label>
                    
                        <input 
                            id="pastel"
                            type="radio"
                            name="theme"
                            value="pastel"
                            checked={theme === 'pastel'}
                            onChange={handleTheme}
                            /> 
                    <label 
                        htmlFor="pastel"> Pastel
                    </label>
                </div>
                <p>Timer mode</p>
            
            <button className="timer-button" onClick={()=>setTimer(!timer)}>{timer ? 'ON' : 'OF'} ⏱️</button>
            </div> 
            
    )
}