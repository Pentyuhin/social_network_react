import React, {useEffect} from "react";
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ActionType, logout} from "../../redux/authReducer";



export const Header: React.FC = React.memo((props) => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)


    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch<any>(logout())
    }

    // const {Header} = Layout

    return (
            <header className={classes.header}>
                <div className={classes.headerContainer}>
                    <div className={classes.headerLogo}>
                        <a href='#'>VK Вконтакте</a>
                        <div className={classes.loginBlock}>
                            {isAuth ? <div>{login} - <button onClick={logoutCallback}>log out</button></div>: <NavLink to={'/login'}>Login</NavLink> }
                        </div>
                    </div>

                </div>
            </header>
    );

})

export default Header;
