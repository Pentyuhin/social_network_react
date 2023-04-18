import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {loginAPI} from "../api/login-api";
import {userAPI} from "../api/users-api";
import {securityAPI} from "../api/security-api";
import {useDispatch} from "react-redux";


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState

export type ActionType = InferActionsTypes<typeof actions>

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionType | FormAction>

const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_SUCCESS':
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }

}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
        return {
            type: 'SET_USER_DATA',
            payload: {
                userId,
                email,
                login,
                isAuth
            }
        } as const
    },

    getCaptchaSuccess: (captchaUrl: string) => {
        return {
            type: 'GET_CAPTCHA_SUCCESS',
            payload: {captchaUrl}
        } as const

    },

}

export const login = (email: string, password: string, rememberMe: boolean, captcha: null | undefined): ThunkType => {
    return async (dispatch) => {
        const data = await loginAPI.login(email, password, rememberMe, captcha)


        if (data.resultCode === 0) {
            await dispatch(getAuthUserData()) // await delete
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = data.messages.length > 0 ? data.messages[0] : "Some error";
            dispatch(stopSubmit("login", {_error: message}))
        }

    }
}


export const logout = (): ThunkType => {
    return async (dispatch) => {
        const data = await loginAPI.logout()

        if (data.resultCode === 0) {
            dispatch(actions.setAuthUserData(null, null, null, false))
        }

    }
}

export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        const data = await userAPI.getAuthUser();

        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        const data = await securityAPI.getCaptchaUrl();
        const captchaUrl = data.url;

        dispatch(actions.getCaptchaSuccess(captchaUrl));
    }
}


export default authReducer;