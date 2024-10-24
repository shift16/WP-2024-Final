import data from "../data/users.json"

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