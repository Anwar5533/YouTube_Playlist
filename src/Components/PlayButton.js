
import { useContext, useState } from 'react';
import './PlayButton.css';
import ThemeContext from '../Context/ThemeContext';
export default function PlayButton({name,children,onPlay,onPause}){
    const theme= useContext(ThemeContext)
    const [Playing,setPlaying] = useState(false);
    
    function handleClick(e){
        e.stopPropagation();
        if (Playing) onPause()
        else onPlay()
        setPlaying (!Playing);
    }
return (
    <>
        <button className={theme} onClick={handleClick}>
            {children}:{Playing ? "⏸️": "▶️" }
        </button>
    </>
);

}