
function Button({Active = false, onClick}) {
    return (
        <button 
            className={Active ? 'active' : ''} onClick={onClick}>

        </button>
    )
    
}
export default Button;