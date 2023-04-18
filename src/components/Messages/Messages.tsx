import React from "react";
import classes from "./Messages.module.css";
import {MessInitialStateType} from "../../redux/messageReducer";
import Message from "./Message";
import Dialog from "./Dialog";
import MessageForm from "./AddNewMessForm";

type OwnPropsType = {
    pageMessage: MessInitialStateType
    addNewMess: (textMessage: string) => void
}

export type NewMessFormValuesType = {
    newMessageBody: string
}

const Messages: React.FC<OwnPropsType> = (props) => {

    let dialog = props.pageMessage.dialogData.map(d => <Dialog key={d.id} id={d.id} name={d.name}/>);
    let message = props.pageMessage.messageData.map(m => <Message key={m.id} message={m.message}/>);


    let addNewMessage = (values: NewMessFormValuesType) => {
        props.addNewMess(values.newMessageBody);
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
                        <MessageForm onSubmit={addNewMessage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Messages;
