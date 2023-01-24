import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    postData: [
        {id: 1, message: 'Hi, my friend! How are you?', likesCount: 19},
        {id: 2, message: 'Hi, my friend! OK?', likesCount: 32},
        {id: 3, message: 'OK?', likesCount: 44},
        {id: 4, message: 'Yoooo', likesCount: 22},
        {id: 5, message: 'Hi, my friend! OK?', likesCount: 77},
    ],
    profile: null,
    status: '',
}



const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 6,
                message: action.textMessagePost,
                likesCount: 30,
            };

            return {
                ...state,
                postData: [...state.postData, newPost]
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };

        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            };
        default:
            return state;
    }

}


export const addPostActionCreate = (textMessagePost) => {
    return {type: ADD_POST, textMessagePost}
}


export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

export const setUserStatus = (status) => {
    return {
        type: SET_USER_STATUS,
        status
    }
}



export const getUserProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            });
    }
}

export const getUserStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getUserStatus(userId)
            .then(data => {
                dispatch(setUserStatus(data));
            });
    }
}

export const updateUserStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateUserStatus(status)
            .then(data => {
                if(data.resultCode === 0) {
                    dispatch(setUserStatus(status));
                }
            });
    }
}

export default profileReducer;