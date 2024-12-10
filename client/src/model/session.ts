import { api } from "./myFetch"

const REQUEST_SESSION_API = "/session/request-token"

type TokenObject = {
    token: string
}

export async function createSession(userHandle: String, userPassword: String): Promise<string> {
    const sessionObject = await api(REQUEST_SESSION_API, 'POST', {
        'userHandle': userHandle,
        'userPassword': userPassword
    }, null) as TokenObject

    const sessionId: string = sessionObject.token 

    sessionStorage.setItem("session", sessionId)
    
    // Work in progress
    return sessionId
}

export function getSession(): string | 'No ID' {
    const sessionId = sessionStorage.getItem("session")
    if (sessionId != null)
        return sessionId
    else
        return 'No ID'
}