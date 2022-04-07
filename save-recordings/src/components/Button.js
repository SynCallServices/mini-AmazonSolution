import '../assets/styles/Button.css'
import PropTypes from 'prop-types'

function Button ({ color, text, onClick }) {
 
    return (
        <button onClick={onClick} style={{backgroundColor: color}} className='btn'>
            {text}
        </button>
    )
}

Button.defaultProps = {
    color: 'green',
    text: 'Hello',
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
}


export default Button;