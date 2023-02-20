import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'proj-react/profile/ADD-POST';

const SET_USER_PROFILE = 'proj-react/profile/SET_USER_PROFILE';
const SET_USER_STATUS = 'proj-react/profile/SET_USER_STATUS';
const SAVE_PHOTO_SUCCESS = 'proj-react/profile/SAVE_PHOTO_SUCCESS';

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

        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
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

export const savePhotoSuccess = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    }
}


export const getUserProfile = (userId) => {
    return async (dispatch) => {
        const data = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data));

    }
}

export const getUserStatus = (userId) => {
    return async (dispatch) => {
        const data = await profileAPI.getUserStatus(userId)

        dispatch(setUserStatus(data));

    }
}

export const updateUserStatus = (status) => {
    return async (dispatch) => {
        const data = await profileAPI.updateUserStatus(status)

        if (data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    }
}

export const savePhoto = (file) => {
    return async (dispatch) => {
        debugger;
        const data = await profileAPI.savePhoto(file)

        if (data.resultCode === 0) {
            dispatch(savePhotoSuccess(data.photos));
        }
    }
}


export const saveProfile = (profile) => {
    return async (dispatch, getState) => {
        debugger;
        const userId = getState().auth.userId;
        const data = await profileAPI.saveProfile(profile)

        if (data.resultCode === 0) {
            dispatch(getUserProfile(userId));
        } else {
            dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        }
    }
}

export default profileReducer;