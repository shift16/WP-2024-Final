import data from "../data/users.json"
import { ref, type Ref } from 'vue'

export interface Credential {
    username: string;
    email: string;
    password: string;
}

export interface AccountDetail {
    name: string;
    profilePicture: string;
}

export interface Permission {
    admin: boolean;
}

export interface WorkoutGoal {
    isMostRecent: boolean;
    isActive: boolean;
    progress: number;
    goalHeader: string;
    goalBody: string;
    goalType: string;
}

export interface WorkoutStats {
    caloriesBurned: number;
    totalTimeWorkingOut: number;
}

export interface NutritionGoal {
    nutritionHeader: string;
    nutrientValue: number;
    nutrientDesiredValue: number;
}

export interface Friend {
    username: string;
}

export interface User {
    credential: Credential;
    accountDetail: AccountDetail;
    permission: Permission;
    workoutGoals: WorkoutGoal[];
    workoutStats: WorkoutStats;
    nutritionGoals: NutritionGoal[];
    friends: Friend[];
}

export interface Users {
    users: User[];
}

export function getUsers(): User[] {
    return data.users
}

export const default_user: User = {
    "credential": {
        "username": "NO_ONE",
        "email": "default@example.com",
        "password": "defaultpassword"
    },
    "accountDetail": {
        "name": "NO ONE",
        "profilePicture": "https://example.com/default-profile-picture.jpg"
    },
    "permission": {
        "admin": false
    },
    "workoutGoals": [
        {
            "isMostRecent": false,
            "isActive": false,
            "progress": 0,
            "goalHeader": "No goals set",
            "goalBody": "No goals set",
            "goalType": "none"
        }
    ],
    "workoutStats": {
        "caloriesBurned": 0,
        "totalTimeWorkingOut": 0
    },
    "nutritionGoals": [
        {
            "nutritionHeader": "No nutrition goals set",
            "nutrientValue": 0,
            "nutrientDesiredValue": 0
        }
    ],
    "friends": []
}


const userThatLoggedIn: Ref<User> = ref(default_user)

export function getUserThatLoggedIn(): User {
    return userThatLoggedIn.value
}

export function setUserThatLoggedIn(new_user: User): void {
    userThatLoggedIn.value = new_user
}