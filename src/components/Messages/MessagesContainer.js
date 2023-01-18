
import {addMessageActionCreate, upDateNewMessageTextActionCreate} from "../../redux/messageReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";


const mapStateToProps = (state) => {
     return {
         newMessText: state.pageMessage.newMessText,
         pageMessage: state.pageMessage
     }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewMess: () => {
            dispatch(addMessageActionCreate());
        },
        upDateNewMessageText: (text) => {
            dispatch(upDateNewMessageTextActionCreate(text));
        }
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Messages);
