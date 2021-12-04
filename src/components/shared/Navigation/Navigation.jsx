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
            {isAuth &&
            <div className='navRight'>
                <h3>{user?.name}</h3>
                <Link to='/'>
                    <img className='avatar'
                         src={user.avatar ? user.avatar : '/images/monkey-avatar.png'}
                         width='40' height='40' alt='avatar'/>
                </Link>
                <button className='logoutBtn' onClick={logoutUser}>
                    <img src='/images/logout.png' alt='Logout'/>
                </button>
            </div>
            }
        </nav>
    )
}
