import axios from "axios";
import {photosType, profileType, usersType} from "../Types/types";



export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'a1bfb64c-4323-46a8-86d3-c7f86c85bad8'
    }
})

export type GetItemsType = {
    items: Array<usersType>
    totalCount: number
    error: string | null
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCapcthaEnum {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}