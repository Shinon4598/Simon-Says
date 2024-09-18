import { useState } from "react";
import './Inicio.css'

export default function Inicio({}) {
    const [difficulty, setDifficulty] = useState('normal');
    const [timer, setTimer] = useState(false);

    const handleDifficulty = (e) => {
        setDifficulty(e.target.value);
        console.log(difficulty);
    }
    return(
        <div>
            <h1>Simon Says</h1>
            <button className="button-start">►</button>
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
            <p>Timer mode</p>
            
            <button onClick={()=>setDifficulty(!difficulty)}>{difficulty ? 'off' : 'on'}</button>
            </div> 
    )
}