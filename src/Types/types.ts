export type postDataType = {
    id: number
    message: string
    likesCount: number
}

export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type photosType = {
    small: string | null
    large: string | null
}

export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
    aboutMe: string
}

export type usersType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
    totalCount: number
    error: string
}