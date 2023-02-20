import React from "react";
import classes from './Profiles.module.css'
import MyProfile from "./MyPrifile/MyProfile";
import PostsContainer from "./Posts/PostsContainer";




function Profile(props){

    return (
            <div className={classes.profile}>
                <MyProfile savePhoto={props.savePhoto}
                           profile={props.profile}
                           status={props.status}
                           updateUserStatus={props.updateUserStatus}
                           isOwner={props.isOwner}
                           saveProfile={props.saveProfile}
                    />
                <PostsContainer/>
            </div>

    )
}


export default Profile;
