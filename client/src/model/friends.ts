import { api, type APIResponse } from './myFetch'

// API URLs
const ROOT_API_URL = '/protected/friends'
const ADD_FRIEND_API_URL = '/'
const GET_ALL_FRIENDS_API_URL = '/'
const REMOVE_FRIEND_API_URL = '/'

type Friend = {
    user_id: number,
    friend_id: number
}

export async function addFriend(token: string, handle: string): Promise<APIResponse> {
    return await api(
        ROOT_API_URL + ADD_FRIEND_API_URL,
        'POST', {'handle': handle}, token
    )
}

export async function getFriends(token: string, userId: number): Promise<Friend[] | APIResponse> {
    return await api<Friend[]>(
        ROOT_API_URL + GET_ALL_FRIENDS_API_URL + userId,
        'GET', null, token
    )
}

export async function removeFriend(token: string, handle: string): Promise<APIResponse> {
    return await api(
        ROOT_API_URL + REMOVE_FRIEND_API_URL + handle,
        'DELETE', null, token
    )
}