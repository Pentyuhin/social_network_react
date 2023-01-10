import React from "react";
import {addMessageActionCreate, upDateNewMessageTextActionCreate} from "../../redux/messageReducer";
import Messages from "./Messages";
import {connect} from "react-redux";



//  function MessagesContainer(props) {
//     debugger
//      let addNewMess = () => {
//          props.dispatch(addMessageActionCreate())
//      };
//
//      let onMessChange = (text) => {
//          props.dispatch(upDateNewMessageTextActionCreate(text));
//      }
//
//     return (
//       <Messages addNewMess={addNewMess}
//                 upDateNewMessageText={onMessChange}
//                 newMessText={props.state.pageMessage.newMessText}
//                 pageMessage={props.state.pageMessage}/>
//     )
// }


const mapStateToProps = (state) => {
     return {
         newMessText: state.pageMessage.newMessText,
         pageMessage: state.pageMessage
     }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewMess: () =>{
            dispatch(addMessageActionCreate());
        },
        upDateNewMessageText: (text) => {
            dispatch(upDateNewMessageTextActionCreate(text));
        }
    }
}



const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages);


export default MessagesContainer;
