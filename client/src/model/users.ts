import { api, type APIResponse } from './myFetch'

// API URLs
const ROOT_API_URL = '/protected/users'
const GET_MY_INFO_API_URL = '/me'
const GET_USER_INFO_API_URL = '/'
const UPDATE_USER_INFO_API_URL = '/'
const GET_ALL_USER_INFO_API_URL = '/all'
const DELETE_USER_API_URL = '/'

export type User = {
    user_id: number,
    picture: string,
    email: string,
    full_name: string,
    is_admin: boolean,
    handle: string,
    password: string
}

// user_id is created automatically in the database
export type NewUser = {
    picture: string,
    email: string,
    full_name: string,
    is_admin: boolean,
    handle: string,
    password: string
}

export type UserPublicInfo = {
    user_id: number,
    picture: string,
    email: string,
    full_name: string,
    handle: string
}

export async function getLoggedInUserInformation(token: string): Promise<User | APIResponse> {
    return await api<User>(ROOT_API_URL + GET_MY_INFO_API_URL, 'GET', null, token)
}

export async function getUserInfo(token: string, userId: number): Promise<User | APIResponse> {
    return await api<User>(
        ROOT_API_URL + GET_USER_INFO_API_URL + userId,
        'GET', null, token
    )
}

export async function updateUserInfo(token:string, userId: number, newUserInfo: User): Promise<APIResponse> {
    return await api(
        ROOT_API_URL + UPDATE_USER_INFO_API_URL + userId,
        'PATCH', newUserInfo, token
    )
}

export async function getAllUserInfo(token: string): Promise<User[] | APIResponse> {
    return await api<User[]>(
        ROOT_API_URL + GET_ALL_USER_INFO_API_URL,
        'GET', null, token
    )
}

export async function deleteUser(token: string, userId: number): Promise<APIResponse> {
    return await api(
        ROOT_API_URL + DELETE_USER_API_URL + userId,
        'DELETE', null, token
    )
}