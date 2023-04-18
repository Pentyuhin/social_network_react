import {FormAction, stopSubmit} from "redux-form";
import {photosType, postDataType, profileType} from "../Types/types";

import { BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profile-api";


export type initialStateType = typeof initialState;

let initialState = {
    postData: [
        {id: 1, message: 'Hi, my friend! How are you?', likesCount: 19},
        {id: 2, message: 'Hi, my friend! OK?', likesCount: 32},
        {id: 3, message: 'OK?', likesCount: 44},
        {id: 4, message: 'Yoooo', likesCount: 22},
        {id: 5, message: 'Hi, my friend! OK?', likesCount: 77},
    ] as Array<postDataType>,
    profile: null as profileType | null,
    status: '',
}


const profileReducer = (state = initialState, action: ActionType): initialStateType => {

    switch (action.type) {
        case 'ADD_POST':
            let newPost = {
                id: 6,
                message: action.textMessagePost,
                likesCount: 30,
            };

            return {
                ...state,
                postData: [...state.postData, newPost]
            };

        case 'SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            };

        case 'SET_USER_STATUS':
            return {
                ...state,
                status: action.status
            };

        case 'SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as profileType
            };

        default:
            return state;
    }

}

type ActionType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType | FormAction>

export const actions = {
    addPostActionCreate: (textMessagePost: string) => {
        return {type: 'ADD_POST', textMessagePost} as const
    },

    setUserProfile: (profile: profileType) => {
        return {
            type: 'SET_USER_PROFILE',
            profile
        } as const
    },

    setUserStatus: (status: string) => {
        return {
            type: 'SET_USER_STATUS',
            status
        } as const
    },

    savePhotoSuccess: (photos: photosType) => {
        return {
            type: 'SAVE_PHOTO_SUCCESS',
            photos
        } as const
    }
}


export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data));

    }
}

export const getUserStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.getUserStatus(userId)

        dispatch(actions.setUserStatus(data));

    }
}

export const updateUserStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.updateUserStatus(status)


        if (data.resultCode === 0) {
            dispatch(actions.setUserStatus(status));
        }
    }
}

export const savePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.savePhoto(file)

        if (data.data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.data.photos));
        }
    }
}


export const saveProfile = (profile: profileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const data = await profileAPI.saveProfile(profile)

        if (data.resultCode === 0) {
            if(userId != null){
                dispatch(getUserProfile(userId));
            } else {
                throw new Error("User can't be null")
            }
        } else {
            dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        }
    }
}

export default profileReducer;