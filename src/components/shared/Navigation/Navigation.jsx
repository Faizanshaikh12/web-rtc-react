import React from 'react'
import {Link} from "react-router-dom";
import './Navigation.css'

export const Navigation = () => {

    return (
        <nav className='container navbar'>
            <Link className='brandStyle' to='/'>
                <img src='/images/logo.png' alt='logo'/>
                <span className='logoText'>Codeshouse</span>
            </Link>
        </nav>
    )
}
