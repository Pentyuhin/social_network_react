import React from "react";
import classes from './Users.module.css'
import userPhoto from '../../img/manky.jpeg'
import {NavLink} from "react-router-dom";






let Users = (props) => {

        let pageCount = Math.ceil(props.totalUsersCount / props.pageSize)

        let pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }

        return <div className={classes.pageUser}>
            <div>
                {
                    pages.map(p => {
                        return <span className={props.currentPage === p && classes.selectedPage}
                                    onClick={() => {
                                        props.onPageChanged(p);
                                    }}>{p}</span>
                    })
                }
            </div>
            {
                props.users.map( u =>  <div key={u.id}>
                        <div className={classes.usersContainer}>
                            <div className={classes.userContent}>
                                <NavLink to={'/' + u.id}>
                                    <img src={u.photos.small != null ? u.photos.small : userPhoto} alt=""/>
                                </NavLink>
                                <div>
                                    {
                                        u.followed
                                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={ () => {
                                                props.unfollowUser(u.id);
                                            }}>From Subscribe</button>
                                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={ () => {
                                                props.followUser(u.id)
                                            } }>Subscribe</button>
                                    }
                                </div>
                            </div>
                            <div>
                                <span>{u.name}</span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    }


export default Users;