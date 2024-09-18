import { useEffect, useState } from "react";


function Button({Active = false, color, time,  onClick}) {

    const styles = Active ? {
        "active":{
            "animation": `brightness ${time / 2000}s infinite`
        },
    } : {};
    return (
        <button 
            className={`${Active ? 'active' : ''} simon-button btn-${color} `} style={styles} onClick={onClick}>
        </button>
    )
    
}
export default Button;