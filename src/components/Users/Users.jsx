import React from "react";
import classes from './Users.module.css'
import userPhoto from '../../img/manky.jpeg'
import {NavLink} from "react-router-dom";
import {userAPI} from "../../api/api";


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
                                            ? <button onClick={ () => {

                                                userAPI.unfollowUser(u)
                                                    .then(data => {
                                                        debugger;
                                                        if(data.resultCode === 0) {
                                                            props.fromSubscribe(u.id);
                                                        }
                                                });

                                            }}>From Subscribe</button>
                                            : <button onClick={ () => {

                                                userAPI.followUser(u)
                                                    .then(data => {
                                                        debugger;
                                                        if(data.resultCode === 0) {
                                                            props.subscribe(u.id);
                                                        }
                                                    });

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