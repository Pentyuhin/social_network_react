import {userAPI} from "../api/api";

const SUBSCRIBE = 'SUBSCRIBE';
const FROM_SUBSCRIBE = 'FROM_SUBSCRIBE';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
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
                users: state.users.map( u => {
                    if(u.id === action.userId){
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case FROM_SUBSCRIBE:
            return {
                ...state,
                users: state.users.map( u => {
                    if(u.id === action.userId){
                        return {...u, followed: false}
                    }
                    return u;
                })
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


export const subscribe= (userId) => {
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

    return (dispatch) => {
        dispatch(setIsFetcheng(true));

        userAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(setIsFetcheng(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));

            });

    }

}


export const followUser = (userId) => {

    return (dispatch) => {

        dispatch(toggleFollowingPogreess(true, userId));
        userAPI.followUser(userId)
            .then(data => {
                if(data.resultCode === 0) {
                    dispatch(subscribe(userId));
                }
                dispatch(toggleFollowingPogreess(false, userId));
            });

    }

}

export const unfollowUser = (userId) => {

    return (dispatch) => {

        dispatch(toggleFollowingPogreess(true, userId));
        userAPI.unfollowUser(userId)
            .then(data => {
                if(data.resultCode === 0) {
                    dispatch(fromSubscribe(userId));
                }
                dispatch(toggleFollowingPogreess(false, userId));
            });

    }

}

export default usersReducer;