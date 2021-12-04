import React from 'react'
import './TextInput.css'

export const TextInput = (props) => {

    return (
        <div>
            <input className='inputStyle' type='text'
                style={{width: props.fullwidth === 'true' ? '100%' : 'inherit'}}
                   {...props}/>
        </div>
    )
}
