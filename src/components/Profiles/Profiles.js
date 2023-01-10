import React from "react";
import classes from './Profiles.module.css'
import MyProfile from "./MyPrifile/MyProfile";
import PostsContainer from "./Posts/PostsContainer";



function Profile(props){

    return (
            <div className={classes.profile}>
                <MyProfile profile={props.profile}/>
                <PostsContainer/>
            </div>

    )
}


export default Profile;
