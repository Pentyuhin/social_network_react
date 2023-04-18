import React from "react";
import classes from "../MyPrifile/MyProfile.module.css";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {LoginFormValuesType} from "../../Login/Login";
import {profileType} from "../../../Types/types";

type PropsType = {
    profile: profileType
}


type ProfileTypeKeys = Extract<keyof profileType, string>


const ProfileDataForm: React.FC<InjectedFormProps<profileType, PropsType> & PropsType>  = ({profile, handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        <button>save</button>
        {
            error &&
            <div className={classes.formSummaryError}>
                <span>{ error }</span>
            </div>
        }
        <div>
            <b>Full name:</b> {createField<ProfileTypeKeys>([], 'Full name', 'fullName', Input)}
        </div>
        <div>
            <b>Looking for a job:</b> {createField(
                [],
                '',
                'lookingForAJob',
                Input,
                {type: 'checkbox'})}
        </div>
            <div>
                <b>My profile skills:</b> {createField<ProfileTypeKeys>([], 'My profile skills', 'lookingForAJobDescription', Textarea)}
            </div>
        <div>
            <b>About Me:</b> {createField<ProfileTypeKeys>([], 'About me', 'aboutMe', Textarea)}
        </div>
        <div>
            <b>Contacts:</b> {Object.
            keys(profile.contacts)
            .map(key => {
                return <div key={key} className={classes.contacts}>

                    <b>{key}: {createField([], key, 'contacts.' + key, Input)}</b>
                </div>
            }
        )}
        </div>
    </form>
}

type ContactType = {
    contactTitle: string
    contactValue: string
}

export const Contact: React.FC<ContactType> = ({contactTitle, contactValue}) => {
    return <div className={classes.contacts}><b>{contactTitle}:</b> {contactValue}</div>
}

const ProfileDataFormReduxForm = reduxForm<profileType, PropsType>({
    form: 'edit-profile',
    enableReinitialize: true,
    destroyOnUnmount: false
})(ProfileDataForm)

export default ProfileDataFormReduxForm;