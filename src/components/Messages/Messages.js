import React from "react";
import classes from "./Messages.module.css";
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";



function Dialog (props){

    let path = `${props.id}`

    return <div className={classes.messDialog}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}

function Message(props) {

    return <div className={classes.message}>
        {props.message}
    </div>
}

 function Messages(props) {

     let dialog = props.pageMessage.dialogData.map(d => <Dialog id={d.id} name={d.name}/>);
     let message = props.pageMessage.messageData.map(m => <Message message={m.message }/>);


     let addNewMessage = (values) => {
         props.addNewMess(values.textMess);
     }

    return (
        <div className={classes.mess}>
            <div className={classes.messContent}>
                <div className={classes.messDialogs}>
                    <div className={classes.messDialog}>
                        {dialog}
                    </div>
                </div>
                <div className={classes.messages}>
                    {message}
                    <div className={classes.formSendMess}>
                        <MessageReduxForm onSubmit={addNewMessage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MessageForm = (props) => {
    const maxLength20 = maxLengthCreator(20);
    return (
        <form onSubmit={props.handleSubmit} className={classes.formMess}>
            <label>Tell us your story:</label>
            <Field validate={[required, maxLength20]} placeholder={'Ender text mess....'} component={Textarea} name={'textMess'}></Field>
            <button className={classes.btn}>ADD POST</button>
        </form>
    )
}

const MessageReduxForm = reduxForm({
    form: 'message'
})(MessageForm)


export default Messages;
