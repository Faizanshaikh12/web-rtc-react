import React from 'react'
import './button.css'

export const Button = (props) => {
    return (
        <button onClick={props.onClick} className='button'>
            <span>{props.text}</span>
            <img className='arrow' src='/images/arrow-forward.png' alt='arrow'/>
        </button>
    )
}
