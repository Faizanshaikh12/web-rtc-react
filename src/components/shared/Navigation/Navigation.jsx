import React from 'react'
import {Link} from "react-router-dom";
import './Navigation.css'
import {logout} from "../../../http";
import {setAuth} from "../../../store/authSlice";
import {useDispatch, useSelector} from "react-redux";

export const Navigation = () => {
    const dispatch = useDispatch();
const {isAuth} = useSelector((state) => state.auth)
    async function logoutUser() {
        try {
            debugger
            const {data} = await logout();
            dispatch(setAuth(data));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <nav className='container navbar'>
            <Link className='brandStyle' to='/'>
                <img src='/images/logo.png' alt='logo'/>
                <span className='logoText'>Codeshouse</span>
            </Link>
            {isAuth && <button onClick={logoutUser}>Logout</button>}
        </nav>
    )
}
