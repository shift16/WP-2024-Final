import data from "../data/users.json"
import { ref, type Ref } from 'vue'

export interface Credential {
    username: string;
    email: string;
    password: string;
}

export interface AccountDetail {
    name: string;
    profile_picture: string;
}

export interface Permission {
    admin: boolean;
}

export interface User {
    credential: Credential;
    account_detail: AccountDetail;
    permission: Permission;
}

export interface Users {
    users: User[];
}

export function getUsers(): User[] {
    return data.users
}

export const default_user: User = {
    "credential": {
        "username": "NOTSET",
        "email": "NOONE@example.com",
        "password": "NOPASSWORD"
    },
    "account_detail": {
        "name": "NO ONE",
        "profile_picture": "https://example.com/ghost.jpg"
    },
    "permission": {
        "admin": false
    }
}

const userThatLoggedIn: Ref<User> = ref(default_user)

export function getUserThatLoggedIn(): User {
    return userThatLoggedIn.value
}

export function setUserThatLoggedIn(new_user: User): void {
    userThatLoggedIn.value = new_user
}