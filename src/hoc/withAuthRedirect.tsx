import React, {ComponentType} from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsFroRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
} as MapStatePropsType);

type MapStatePropsType = {
    isAuth: boolean
}

type DispatchPropsType = {}

export function withAuthRedirect<WCP extends MapStatePropsType>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapStatePropsType & DispatchPropsType> = (props) => {

        let {isAuth, ...restProps} = props

        if (!isAuth) return <Navigate to='/login'/>

        return <WrappedComponent {...restProps as WCP}/>
    };

    let ConnectAuthRedirectComponent = connect<MapStatePropsType,
        DispatchPropsType,
        WCP,
        AppStateType>(mapStateToPropsFroRedirect, {})(RedirectComponent)


    return ConnectAuthRedirectComponent;
}