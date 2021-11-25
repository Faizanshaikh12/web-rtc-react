import React from 'react'
import './TextInput.css'

export const TextInput = (props) => {

    return (
        <div>
            <input className='inputStyle' type='text' {...props}/>
        </div>
    )
}
