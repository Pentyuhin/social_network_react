import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import classes from "./Messages.module.css";
import {createField, Textarea} from "../common/FormsControls/FormsControls";
import {NewMessFormValuesType} from "./Messages";



export type NewMessLoginFormValuesTypeKeys = Extract<keyof NewMessFormValuesType, string>

type PropsType = {}

const MessageForm: React.FC<InjectedFormProps<NewMessFormValuesType, PropsType> & PropsType> = (props) => {
    const maxLength20 = maxLengthCreator(20);

    return (
        <form onSubmit={props.handleSubmit} className={classes.formMess}>
        <label>Tell us your story:</label>
    {createField<NewMessLoginFormValuesTypeKeys>([required, maxLength20], 'Ender text mess....', 'newMessageBody', Textarea)}
        <button className={classes.btn}>ADD POST</button>
    </form>
)
}

export default reduxForm<NewMessFormValuesType>({form: 'message'})(MessageForm);
