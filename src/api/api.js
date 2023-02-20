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
}


export const profileAPI = {

    getProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },
    getUserStatus(userId) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data)
    },
    updateUserStatus(status) {
        return instance.put(`/profile/status/`, {status: status})
            .then(response => response.data)
    },

    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put('/profile/photo/', formData, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
    },

    saveProfile(profile) {
        return instance.put(`/profile/`, profile)
            .then(response => response.data)
    }
}


export const loginAPI = {
    login(email, password, rememberMe = false, captcha=null){
        return instance.post(`/auth/login/`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout(){
        return instance.delete(`/auth/login/`)
            .then(response => response.data)
    }
}

export const securityAPI = {
    getCaptchaUrl(){
        return instance.get(`/security/get-captcha-url`)
            .then(response => response.data)
    }
}
