import {captchaAPI, loginAPI, securityAPI, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA= 'proj-react/auth/SET_USER_DATA';
const GET_CAPTCHA_SUCCESS = 'proj-react/auth/GET_CAPTCHA_SUCCESS';



let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isFetcheng: false,
    captchaUrl: null

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA:
        case GET_CAPTCHA_SUCCESS:
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


export const getCaptchaSuccess = (captchaUrl) => {
    return {
        type: GET_CAPTCHA_SUCCESS,
        payload: {captchaUrl}
    }

}


export const getAuthUserData = () => {
    return async (dispatch) => {
        const data = await userAPI.getAuthUser();

        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        const data = await loginAPI.login(email, password, rememberMe, captcha)

        if (data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
            if(data.resultCode === 10){
                dispatch(getCaptchaUrl());
            }
            let message = data.messages.length > 0 ? data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}))
        }

    }
}



export const logout = () => {
    return async (dispatch) => {
        const data = await loginAPI.logout()

        if (data.resultCode === 0) {
            dispatch(getAuthUserData(null, null, null, false))
        }

    }
}

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        const data = await securityAPI.getCaptchaUrl();
        const captchaUrl = data.url;

        dispatch(getCaptchaSuccess(captchaUrl));
    }
}


export default authReducer;