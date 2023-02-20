import React from "react";
import classes from './Users.module.css'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";



let Users = ({currentPage, onPageChanged, totalItemsCount, pageSize, ...props}) => {

    return <div className={classes.pageUser}>

            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize}/>


        {
            props.users.map(u => <User user={u}
                                       followingInProgress={props.followingInProgress}
                                       unfollowUser={props.unfollowUser}
                                       followUser={props.followUser}
                                       key={u.id}/>
            )
        }
    </div>
}


export default Users;