import { useEffect, useState } from "react";

function Button({Active = false, color,  onClick}) {

    return (
        <button 
            className={`${Active ? 'active' : ''} simon-button btn-${color} `} onClick={onClick}>
        </button>
    )
    
}
export default Button;