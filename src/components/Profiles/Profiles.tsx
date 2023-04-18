import React from "react";
import classes from './Profiles.module.css'
import MyProfile from "./MyPrifile/MyProfile";
import PostsContainer from "./Posts/PostsContainer";
import {profileType} from "../../Types/types";
import {updateUserStatus} from "../../redux/profileReducer";

type PropsType = {
    savePhoto: (file: any) => void
    profile: profileType | null
    status: string
    updateUserStatus: (status: string) => string
    isOwner: boolean
    saveProfile: (profile: profileType) => Promise<any>
}


let Profile: React.FC<PropsType> = (props) => {

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
