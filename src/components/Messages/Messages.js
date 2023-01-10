import React from "react";
import classes from "./Messages.module.css";
import {NavLink} from "react-router-dom";



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

     let newMessElement = React.createRef();

     let addNewMess = () => {
         props.addNewMess();
     };

     let onMessChange = () => {
         let text = newMessElement.current.value;
         props.upDateNewMessageText(text);
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
                        <form className={classes.formMess} action="#" name="mess-form">
                            <label>Tell us your story:</label>
                            <textarea onChange={onMessChange} ref={newMessElement} value={props.newMessText}></textarea>
                            <button onClick={addNewMess} className={classes.btn}>ADD POST</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Messages;
