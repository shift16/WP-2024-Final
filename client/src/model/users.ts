import { api } from './myFetch'

const GET_USER_INFORMATION_API = '/users/get-user-information'

export type User = {
    userHandle: String
}

export function getUserInformaton(loggedInUserToken:String, userHandle: String) {
    
}