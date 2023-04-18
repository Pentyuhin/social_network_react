import React, {ChangeEvent, useState} from "react";
import classes from "./MyProfile.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusHook from "../ProfileInfo/ProfileInfoStatusHook";
import ProfileDataForm, {Contact} from "../ProfileInfo/ProfileDataForm";
import {contactsType, profileType} from "../../../Types/types";

type PropsType = {
    savePhoto: (file: File) => void
    profile: profileType
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    saveProfile: (profile: profileType) => Promise<any>

}

const InfoPerson: React.FC<PropsType> = ({saveProfile, savePhoto, profile, status, isOwner, updateUserStatus}) => {

    let [editMode, setEditMode] = useState(false);


    const onSubmit = (formData: profileType) => {
        // todo: remove then
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    const onMainPhotosSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            savePhoto(event.target.files[0])
        }
    }
    return <div className={classes.infoBlock}>
        <div className={classes.infoAva}>
            <img src={!profile.photos.small ? 'https://maxblogs.ru/images/926.jpg' : profile.photos.small}
                 alt="Avotar"/>
        </div>
        {isOwner && <input type="file" onChange={onMainPhotosSelected}/>}
        <div className={classes.profileContant}>
            <div><b>STATUS:</b> <ProfileStatusHook status={status} updateUserStatus={updateUserStatus}/>
            </div>
            { editMode
                ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => setEditMode(true)}/> }
        </div>
    </div>
};

type ProfileDataPropsType = {
    profile: profileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {

    return <div>
        {isOwner && <button onClick={goToEditMode}>Edit</button>}
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {
                profile.lookingForAJob &&
                <div>
                    <b>My profile skills:</b> {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About Me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <Contact
                        key={key}
                        contactTitle={key}
                        contactValue={profile.contacts[key as keyof contactsType]}/>
                }
            )}
            </div>
        </div>
}


type MyProfileType = {
    savePhoto: (file: File) => void
    profile: profileType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    saveProfile: (profile: profileType) => Promise<any>
}


const MyProfile: React.FC<MyProfileType> = props => {
    if (!props.profile) {
        return <Preloader/>
    }
    return <InfoPerson savePhoto={props.savePhoto}
                       profile={props.profile}
                       status={props.status}
                       updateUserStatus={props.updateUserStatus}
                       isOwner={props.isOwner}
                       saveProfile={props.saveProfile}
    />

};

export default MyProfile