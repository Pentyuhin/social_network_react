import {instance} from "./api";

type loginAPIType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
    resultCode: number
    messages: Array<string>
}

export const loginAPI = {
    login(email: string, password: string, rememberMe = false, captcha= null){
        return instance.post<loginAPIType>(`auth/login/`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout(){
        return instance.delete<loginAPIType>(`auth/login/`)
            .then(response => response.data)
    }
}