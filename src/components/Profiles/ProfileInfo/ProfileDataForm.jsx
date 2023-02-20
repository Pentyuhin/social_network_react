import React from "react";
import classes from "../MyPrifile/MyProfile.module.css";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({profile, handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
        <button>save</button>
        {
            error &&
            <div className={classes.formSummaryError}>
                <span>{ error }</span>
            </div>
        }
        <div>
            <b>Full name:</b> {createField([], 'Full name', 'fullName', Input)}
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
                <b>My profile skills:</b> {createField([], 'My profile skills', 'lookingForAJobDescription', Textarea)}
            </div>
        <div>
            <b>About Me:</b> {createField([], 'About me', 'aboutMe', Textarea)}
        </div>
        <div>
            <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={classes.contacts}>

                    <b>{key}: {createField([], key, 'contacts.' + key, Input)}</b>
                </div>
            }
        )}
        </div>
    </form>
}

export const Contact = ({contactTitle, contactValue}) => {
    return <div className={classes.contacts}><b>{contactTitle}:</b> {contactValue}</div>
}

const ProfileDataFormReduxForm = reduxForm({
    form: 'edit-profile',
    enableReinitialize: true,
    destroyOnUnmount: false
})(ProfileDataForm)

export default ProfileDataFormReduxForm;