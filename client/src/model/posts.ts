import { api, type APIResponse } from './myFetch'

// API URLs
const ROOT_API_URL = '/protected/posts'
const ADD_POST_API_URL = '/'
const DELETE_POST_API_URL = '/'
const GET_ALL_POSTS_API_URL = '/all/'
const GET_FRIENDS_POSTS_API_URL = '/friends'
const UPDATE_POST_API_URL = '/'

export type Post = {
    post_id: number,
    user_id: number,
    content: string,
    post_date: string,
    calories_burned: number,
    active_minutes: number,
    workout_intensity: number
}

// post_id is created automatically in the database
export type NewPost = {
    user_id: number,
    content: string,
    post_date: string,
    calories_burned: number,
    active_minutes: number,
    workout_intensity: number
}

export async function addPost(token: string, newPost: NewPost): Promise<APIResponse> {
    return await api(
        ROOT_API_URL + ADD_POST_API_URL,
        'POST', newPost, token
    )
}

export async function deletePost(token: string, postId: number): Promise<APIResponse> {
    return await api(
        ROOT_API_URL + DELETE_POST_API_URL + postId,
        'DELETE', null, token
    )
}

export async function getAllPosts(token: string, userId: number): Promise<Post[] | APIResponse> {
    return await api<Post[]>(
        ROOT_API_URL + GET_ALL_POSTS_API_URL + userId,
        'GET', null, token
    )
}

export async function getFriendsPosts(token: string): Promise<Post[] | APIResponse> {
    return await api<Post[]>(
        ROOT_API_URL + GET_FRIENDS_POSTS_API_URL,
        'GET', null, token
    )
}

export async function updatePost(token: string, postId: number, updatedPost: Post): Promise<APIResponse> {
    return await api(
        ROOT_API_URL + UPDATE_POST_API_URL + postId,
        'PATCH', updatedPost, token
    )
}