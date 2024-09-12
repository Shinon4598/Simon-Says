import { useEffect, useState } from 'react'
import './App.css'
import Button from './Components/button';

function App() {
  const [colors, setColors] = useState([0, 1, 2, 3]);
  const [ActiveColor, setActiveColor] = useState(0);
  

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < colors.length) {
        setActiveColor(colors[index]);
        index++;
      }
      else{
        clearInterval(interval);
      }
    }, 1000);
  }, [colors])

  useEffect(() => {
    console.log(ActiveColor);
  }, [ActiveColor])
  const updateColors = (color) => {
    console.log(colors);
  }

  return (
    <>
        {
          colors.map((color, index) => (
            <Button key={index} Active= {index == ActiveColor} OnClick = {() => updateColors()}></Button>
          ))  
        }
    </>
  )
}

export default App
