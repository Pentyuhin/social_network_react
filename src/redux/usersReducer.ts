import {updateObjectInArray} from "../utils/object-helpers";
import {usersType} from "../Types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {userAPI} from "../api/users-api";


let initialState = {
    users: [] as Array<usersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetcheng: true,
    followingInProgress: [] as Array<number>, // array of users ids
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

type initialStateType = typeof initialState
export type FilterType = typeof initialState.filter

const usersReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'SUBSCRIBE':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }

        case 'FROM_SUBSCRIBE':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }

        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount,
            }
        case 'SET_IS_FETCHING':
            return {
                ...state,
                isFetcheng: action.isFetcheng,
            }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetcheng
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId),
            }
        case 'SN/USERS/SET_FILTER':
            return {
                ...state,
                filter: action.payload
            }

        default:
            return state;
    }

}

export type ActionTypes = InferActionsTypes<typeof actions>


export const actions = {
    subscribe: (userId: number) => {
        return {
            type: 'SUBSCRIBE',
            userId
        } as const
    },

    fromSubscribe: (userId: number) => {
        return {
            type: 'FROM_SUBSCRIBE',
            userId
        } as const
    },

    setUsers: (users: Array<usersType>) => {
        return {
            type: 'SET_USERS',
            users
        } as const
    },

    setCurrentPage: (currentPage: number) => {
        return {
            type: 'SET_CURRENT_PAGE',
            currentPage
        } as const
    },

    setTotalUsersCount: (totalUsersCount: number) => {
        return {
            type: 'SET_TOTAL_USERS_COUNT',
            totalUsersCount
        } as const
    },

    setIsFetcheng: (isFetcheng: boolean) => {
        return {
            type: 'SET_IS_FETCHING',
            isFetcheng
        } as const
    },

    toggleFollowingPogreess: (isFetcheng: boolean, userId: number) => {
        return {
            type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
            isFetcheng,
            userId
        } as const
    },

    setFilter: (filter: FilterType) => ({type: 'SN/USERS/SET_FILTER', payload: filter} as const)
}

export type DispatchType = Dispatch<ActionTypes>

type ThunkType = BaseThunkType<ActionTypes>


export const getUsersThunkCreator = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {

    return async (dispatch, getState) => {

        dispatch(actions.setIsFetcheng(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilter(filter))

        const data = await userAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)

        dispatch(actions.setIsFetcheng(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }

}

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionTypes) => {

    dispatch(actions.toggleFollowingPogreess(true, userId));
    const data = await apiMethod(userId)

    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingPogreess(false, userId));

}


export const followUser = (userId: number): ThunkType => {

    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, userAPI.followUser.bind(userAPI), actions.subscribe);
    }

}

export const unfollowUser = (userId: number): ThunkType => {

    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, userAPI.unfollowUser.bind(userAPI), actions.fromSubscribe);
    }

}



export default usersReducer;