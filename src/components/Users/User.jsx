import React from "react";
import classes from './Users.module.css'
import userPhoto from '../../img/manky.jpeg'
import {NavLink} from "react-router-dom";



let User = ({user, followingInProgress, unfollowUser, followUser}) => {

    return <div>

        <div className={classes.usersContainer}>
            <div className={classes.userContent}>
                <NavLink to={'/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} alt=""/>
                </NavLink>
                <div>
                    {
                        user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          unfollowUser(user.id);
                                      }}>From Subscribe</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {
                                          followUser(user.id)
                                      }}>Subscribe</button>
                    }
                </div>
            </div>
            <div>
                <span>{user.name}</span>
                <span></span>
            </div>
        </div>
    </div>

}


export default User;