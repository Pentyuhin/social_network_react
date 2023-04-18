import {getAuthUserData} from "./authReducer";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";


let initialState = {
    initialized: false,
}

export type InitialStateType = typeof initialState

const actions = {
    setInitializedSuccess: () => {
        return {
            type: 'SET_INITIALIZED_SUCCESS'
        } as const
    }
}

type ActionTypes = InferActionsTypes<typeof actions>


const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET_INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true,
            }

        default:
            return state;
    }

}


export const initializeApp = (): ThunkAction<void, AppStateType, unknown, ActionTypes> => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData());

        Promise.all([promise]).then(() => {
            dispatch(actions.setInitializedSuccess());
        })
    }
}


export default authReducer;