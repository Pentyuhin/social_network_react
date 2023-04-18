import {AppStateType} from "./redux-store";


export const getUsersSelector = (state: AppStateType) => {
  return state.pageUsers.users;
}

export const getPageSize = (state: AppStateType) => {
    return state.pageUsers.pageSize;
}

export const getTotalUsers = (state: AppStateType) => {
  return state.pageUsers.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
  return state.pageUsers.currentPage;
}

export const getIsFetcheng = (state: AppStateType) => {
  return state.pageUsers.isFetcheng;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.pageUsers.followingInProgress;
}

export const getIsAuthSelector = (state: AppStateType) => {
  return state.auth.isAuth;
}

export const getUsersFilter = (state: AppStateType) => {
    return state.pageUsers.filter;
}