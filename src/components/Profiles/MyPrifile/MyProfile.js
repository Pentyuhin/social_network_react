import React from "react";
import classes from "./MyProfile.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "../ProfileInfo/ProfileInfo";


function InfoPerson(props){
    return  <div className={classes.infoBlok}>
        <div className={classes.inforAva}>
            <img src={!props.profile.photos.small ? 'https://maxblogs.ru/images/926.jpg' :  props.profile.photos.small} alt="Avotar"/>
        </div>
        <div className={classes.profileContant}>
            <div>STATUS: <ProfileStatus textStatus={'Hi My friends, I\'Here'}/></div>
            <div className={classes.profileInform}>Name: {props.profile.fullName}</div>
            <div className={classes.profileInform}>Job: {props.profile.lookingForAJobDescription}</div>
            <div className={classes.profileInform}>Contacts: {props.profile.contacts.github}</div>
            <div className={classes.profileInform}>About Me: {props.profile.aboutMe}</div>
            <div className={classes.profileInform}>Age: {!props.age ? 31 : props.age}</div>
        </div>
    </div>
}

function MyProfile(props) {
    if (!props.profile){
        return <Preloader/>
    }
    return <InfoPerson profile={props.profile}/>

}

export default MyProfile