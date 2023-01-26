import {loginAPI, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA= 'SET_USER_DATA';



let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetcheng: false,

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }

}

export const setAuthUserData= (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: {
            userId,
            email,
            login,
            isAuth}
    }
}


export const getAuthUserData = () => {
    return (dispatch) => {
        return userAPI.getAuthUser()
            .then(data => {
                if(data.resultCode === 0){
                    let {id, email, login} = data.data;
                    dispatch(setAuthUserData(id, email, login, true));
                }
            });
    }
}

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        loginAPI.login(email, password, rememberMe)
            .then(data => {
                if(data.resultCode === 0){
                    dispatch(getAuthUserData())
                } else {
                    let message = data.messages.length > 0 ? data.messages[0] : "Some error";
                    dispatch(stopSubmit("login", {_error: message}))
                }
            });
    }
}

export const logout = () => {
    return (dispatch) => {
        loginAPI.logout()
            .then(data => {
                if(data.resultCode === 0){
                    dispatch(getAuthUserData(null, null, null, false))
                }
            });
    }
}


export default authReducer;