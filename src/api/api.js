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

    unfollowUser(u){
        return instance.delete(`follow/${u.id}`)
            .then(response => response.data)
    },

    followUser(u){
        return instance.post(`follow/${u.id}`)
            .then(response => response.data)
    },

    getUserId(userId){
        debugger;
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    }
}


