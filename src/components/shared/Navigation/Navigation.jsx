import React from 'react'
import {Link} from "react-router-dom";
import './Navigation.css'
import {logout} from "../../../http";
import {setAuth} from "../../../store/authSlice";
import {useDispatch, useSelector} from "react-redux";

export const Navigation = () => {
    const dispatch = useDispatch();
    const {isAuth, user} = useSelector((state) => state.auth)

    async function logoutUser() {
        try {
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
            <div className='navRight'>
                <h3>{user && user.name}</h3>
                <Link to='/'>
                    <img className='avatar' src={user && user.avatar} width='40' height='40' alt='avatar'/>
                </Link>
                {isAuth && <button className='logoutBtn' onClick={logoutUser}>
                    <img src='/images/logout.png' alt='Logout'/>
                </button>}
            </div>
        </nav>
    )
}
