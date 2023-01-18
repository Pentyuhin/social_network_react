import {userAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    postData: [
        {id: 1, message: 'Hi, my friend! How are you?', likesCount: 19},
        {id: 2, message: 'Hi, my friend! OK?', likesCount: 32},
        {id: 3, message: 'OK?', likesCount: 44},
        {id: 4, message: 'Yoooo', likesCount: 22},
        {id: 5, message: 'Hi, my friend! OK?', likesCount: 77},
    ],
    newPostText: 'I\'m new post',
    profile: null
}



const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 6,
                message: state.newPostText,
                likesCount: 30,
            };

            return {
                ...state,
                newPostText: '',
                postData: [...state.postData, newPost]
            };

        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newTextPost,
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;
    }

}


export const addPostActionCreate = () => {
    return {type: ADD_POST}
}

export const updateNewPostTextActionCreate = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newTextPost: text
    }
}

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}



export const getUserProfile = (userId) => {
    return (dispatch) => {
        userAPI.getUserId(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            });
    }
}

export default profileReducer;