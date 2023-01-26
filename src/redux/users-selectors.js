


export const getUsers = (state) => {
  return state.pageUsers.users;
}

export const getPageSize = (state) => {
    return state.pageUsers.pageSize;
}

export const getTotalUsers = (state) => {
  return state.pageUsers.totalUsersCount;
}

export const getCurrentPage = (state) => {
  return state.pageUsers.currentPage;
}

export const getIsFetcheng = (state) => {
  return state.pageUsers.isFetcheng;
}

export const getFollowingInProgress = (state) => {
    return state.pageUsers.followingInProgress;
}

export const getIsAuth = (state) => {
  return state.auth.isAuth;
}