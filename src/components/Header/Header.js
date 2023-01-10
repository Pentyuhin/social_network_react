import React from "react";
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";


function Header(props){

    return (
            <header className={classes.header}>
                <div className={classes.headerContainer}>
                    <div className={classes.headerLogo}>
                        <a href='#'>VK Вконтакте</a>
                        <div className={classes.loginBlock}>
                            {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink> }
                        </div>
                    </div>

                </div>
            </header>
    );

}

export default Header;
