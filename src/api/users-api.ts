import {GetItemsType, instance} from "./api";

type AuthMeUserAPIType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}



export const userAPI = {

    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then((response) => response.data);
    },

    getAuthUser(){
        return instance.get<AuthMeUserAPIType>(`auth/me`)
            .then(response => response.data)
    },

    unfollowUser(userId: number){
        return instance.delete<number>(`follow/${userId}`)
            .then(response => response.data)
    },

    followUser(userId: number){
        return instance.post<number>(`follow/${userId}`)
            .then(response => response.data)
    },
}

