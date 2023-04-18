import {photosType, profileType} from "../Types/types";
import {instance} from "./api";

type UserStatusType<D={}> = {
    data: D
    resultCode: number
    messages: Array<string>

}

type savePhotoDataType = {
    small: string
    large: string
    photos: photosType
}



export const profileAPI = {

    getProfile(userId: number) {
        return instance.get<profileType>(`profile/` + userId)
            .then(response => response.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
            .then(response => response.data)
    },
    updateUserStatus(status: string) {
        return instance.put<UserStatusType>(`profile/status/`, {status: status})
            .then(response => response.data)
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<UserStatusType<savePhotoDataType>>('profile/photo/', formData, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        })
    },

    saveProfile(profile: profileType) {
        return instance.put<UserStatusType<savePhotoDataType>>(`profile/`, profile)
            .then(response => response.data)
    }
}