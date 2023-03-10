import {getAuthUserData} from "./authReducer";

const SET_INITIALIZED_SUCCESS= 'SET_INITIALIZED_SUCCESS';



let initialState = {
    initialized: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }

        default:
            return state;
    }

}

export const setInitializedSuccess= () => {
    return {
        type: SET_INITIALIZED_SUCCESS
    }
}


export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData());

        Promise.all([promise]).then(() => {
            dispatch(setInitializedSuccess());
        })
    }
}


export default authReducer;