import {userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const SUBSCRIBE = 'proj-react/users/SUBSCRIBE';
const FROM_SUBSCRIBE = 'proj-react/users/FROM_SUBSCRIBE';
const SET_USERS = 'proj-react/users/SET_USERS';
const SET_CURRENT_PAGE = 'proj-react/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'proj-react/users/SET_TOTAL_USERS_COUNT';
const SET_IS_FETCHING = 'proj-react/users/SET_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'proj-react/users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetcheng: true,
    followingInProgress: [],
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBSCRIBE:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }

        case FROM_SUBSCRIBE:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }

        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetcheng: action.isFetcheng,
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetcheng
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            }

        default:
            return state;
    }

}


export const subscribe = (userId) => {
    return {
        type: SUBSCRIBE,
        userId
    }
}

export const fromSubscribe = (userId) => {
    return {
        type: FROM_SUBSCRIBE,
        userId
    }
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const setTotalUsersCount = (totalUsersCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    }
}

export const setIsFetcheng = (isFetcheng) => {
    return {
        type: SET_IS_FETCHING,
        isFetcheng
    }
}

export const toggleFollowingPogreess = (isFetcheng, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetcheng,
        userId
    }
}


export const getUsersThunkCreator = (currentPage, pageSize) => {

    return async (dispatch) => {
        dispatch(setIsFetcheng(true));
        dispatch(setCurrentPage(currentPage));

        const data = await userAPI.getUsers(currentPage, pageSize)

        dispatch(setIsFetcheng(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }

}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

        dispatch(toggleFollowingPogreess(true, userId));
        const data = await apiMethod(userId)

        if (data.resultCode === 0) {
            dispatch(actionCreator(userId));
        }
        dispatch(toggleFollowingPogreess(false, userId));

}


export const followUser = (userId) => {

    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.followUser.bind(userAPI), subscribe);
    }

}

export const unfollowUser = (userId) => {

    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, userAPI.unfollowUser.bind(userAPI), fromSubscribe);
    }

}

export default usersReducer;