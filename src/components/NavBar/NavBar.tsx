import React from "react";
import classes from './NavBar.module.css';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className={classes.nav}>
            <div className={classes.navItems}>
                <div className={classes.navItem}>
                    <NavLink to='/'>
                        Моя страница
                    </NavLink>
                </div>
                <div className={classes.navItem}>
                    <NavLink to='/messages'>
                        Массенджер
                    </NavLink>
                </div>
                <div className={classes.navItem}>
                    <NavLink to='/news'>
                        Новости
                    </NavLink>
                </div>
                <div className={classes.navItem}>
                    <NavLink to='/settings'>
                        Настройка
                    </NavLink>
                </div>
                <div className={classes.navItem}>
                    <NavLink to='/users'>
                        Друзья
                    </NavLink>
                </div>
                <div className={classes.navItem}>
                    <NavLink to='/chat'>
                        Chat
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
