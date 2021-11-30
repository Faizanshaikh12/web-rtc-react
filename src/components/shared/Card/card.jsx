import React from 'react'
import './card.css'

export const Card = (props) => {
    return (
        <div className='card'>
            <div className='headingWrapper'>
                {props.icon && <img src={`/images/${props.icon}`} alt='logo'/>}
                <h1 className='heading'>{props.title}</h1>
            </div>
            {props.children}
        </div>
    )
}
