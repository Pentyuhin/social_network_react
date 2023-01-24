import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'a1bfb64c-4323-46a8-86d3-c7f86c85bad8'
    }
})


export const userAPI = {

    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },

    getAuthUser(){
        return instance.get(`auth/me`)
            .then(response => response.data)
    },

    unfollowUser(userId){
        return instance.delete(`follow/${userId}`)
            .then(response => response.data)
    },

    followUser(userId){
        return instance.post(`follow/${userId}`)
            .then(response => response.data)
    },

    // getProfile(userId){
    //     console.warn('Obsolete method. Please profileAPI object.')
    //     return profileAPI.getProfile(userId)
    //         .then(response => response.data)
    // }
}


export const profileAPI = {

    getProfile(userId){
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },
    getUserStatus(userId){
        return instance.get(`profile/status/` + userId)
        .then(response => response.data)
    },
    updateUserStatus(status){
        return instance.put(`/profile/status/`, {status: status})
        .then(response => response.data)
    }
}


export const loginAPI = {
    login(email, password, rememberMe = false){
        return instance.post(`/auth/login`, {email, password, rememberMe})
            .then(response => response.data)
    },
    logout(){
        return instance.delete(`/auth/login`)
            .then(response => response.data)
    }
}
