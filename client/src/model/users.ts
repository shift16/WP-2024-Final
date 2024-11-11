import { ref, type Ref } from 'vue'

// The code in users.json was written by AI models (Llama 3.1 and Mixtral 8x7B)
import data from "../data/users.json"

// The code below was written by Llama 3.1 70B
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
    isRecent: boolean;
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

// The code above was written by Llama 3.1 70B

// The code below was written with the help of Mixtral 8x7B
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
            "isRecent": false,
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

// The code below was written by me

export function getUsers(): User[] {
    return data.users
}

const userThatLoggedIn: Ref<User> = ref(default_user)

export function getUserThatLoggedIn(): User {
    return userThatLoggedIn.value
}

export function setUserThatLoggedIn(new_user: User): void {
    userThatLoggedIn.value = new_user
}

export function removeUser(username: string): void {
    data.users = data.users.filter((user: User) => {
        return user.credential.username !== username
    })
}

export function addUser(newUser: User): void {
    data.users.push(newUser)
}

export function getUser(username: string): User {
    // Set it to the default user 
    let returnUser: User = default_user

    data.users.forEach((user: User) => {
        if (user.credential.username === username) {
            returnUser = user
        }
    })

    return returnUser
}

export function getActiveWorkout(user: User): WorkoutGoal {
    let activeWorkout: WorkoutGoal = {
        'isActive': true,
        'goalBody': "No active goals",
        'goalHeader': 'Nothing',
        'goalType': 'workout',
        'isRecent': true,
        'progress': 0
    }

    user.workoutGoals.forEach((workout: WorkoutGoal) => {
        if (workout.isActive === true) {
            activeWorkout = workout
        }
    })

    return activeWorkout
}

export function getRecentWorkouts(user: User): WorkoutGoal[] {
    const recentWorkouts: WorkoutGoal[] = [] as WorkoutGoal[]

    user.workoutGoals.forEach((workout: WorkoutGoal) => {
        if (workout.isRecent)
            recentWorkouts.push(workout)
    })

    return recentWorkouts
}