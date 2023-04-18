import {actions} from "../../redux/messageReducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import Messages from "./Messages";
import React, {ComponentType} from 'react';


const mapStateToProps = (state: AppStateType) => {
    return {
        pageMessage: state.pageMessage
    }
}


export default compose<ComponentType>(
    connect(mapStateToProps, {
     ...actions
    }),
    withAuthRedirect,
)(Messages);
