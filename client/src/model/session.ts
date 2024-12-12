import { api, type APIResponse } from "./myFetch"
import { type User } from "./users"

// API URLs
const ROOT_API_URL = '/public/session'
const REQUEST_LOGIN_API_URL = '/login'
const REQUEST_SIGN_UP_API_URL = '/signup'

export type TokenObject = {
    token: string,
    is_admin: boolean
}

export async function loadSession(userHandle: String, userPassword: String): Promise<TokenObject | APIResponse> {
    const sessionObject = await api<TokenObject>(ROOT_API_URL + REQUEST_LOGIN_API_URL, 'POST', {
        'userHandle': userHandle,
        'userPassword': userPassword
    }, null)

    if ('token' in sessionObject) {
        const tokenId: string = sessionObject.token 
        const isAdmin: boolean = sessionObject.is_admin
    
        sessionStorage.setItem("token", tokenId)
        sessionStorage.setItem('is_admin', Boolean(isAdmin).toString())
    }
    
    return sessionObject
}

export type Session = {
    token: string | null,
    is_admin: boolean | null
}

export function getSession(): Session {
    const token = sessionStorage.getItem("token")
    const isAdmin = sessionStorage.getItem('is_admin')

    if (token != null)
        return { token: token, is_admin: isAdmin === 'true' }
    else
        return { token: null, is_admin: null}
}

export async function createSession(newAccount: User): Promise<TokenObject | APIResponse> {
    const sessionObject = await api<TokenObject>(
        ROOT_API_URL + REQUEST_SIGN_UP_API_URL,
        'POST', newAccount, null
    )

    if ('token' in sessionObject) {
        const tokenId: string = sessionObject.token 
        const isAdmin: boolean = sessionObject.is_admin
    
        sessionStorage.setItem("token", tokenId)
        sessionStorage.setItem('is_admin', Boolean(isAdmin).toString())
    }
    
    return sessionObject
}

export function endSession() {
    sessionStorage.clear()
}