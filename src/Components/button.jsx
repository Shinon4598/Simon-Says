
function Button({Active = false, color,  onClick}) {
    return (
        <button 
            className={`${Active ? 'active' : ''} simon-button btn btn-${color}`} onClick={onClick}>
        </button>
    )
    
}
export default Button;