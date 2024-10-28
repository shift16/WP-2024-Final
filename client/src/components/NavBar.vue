<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, useTemplateRef, type Ref } from 'vue'
import { getUserThatLoggedIn, getUsers, setUserThatLoggedIn, default_user, type User, type Friend } from '@/model/users';
import { addFriend, getFriends } from '@/model/friends';
import router from '@/router';

const searchModalActive: Ref<boolean> = ref(false)

const navBarBurgerActive: Ref<boolean> = ref(false)

const similarUsers: Ref<User[]> = ref([] as User[])

const allUsers: User[] = getUsers()

const loggedInUser: Ref<User> = ref(getUserThatLoggedIn())

const searchInputElement = useTemplateRef("searchInput")

const notificationText: Ref<string> = ref("NO TEXT")

const showNotification: Ref<boolean> = ref(false)

const isAdmin: Ref<boolean> = ref(loggedInUser.value.permission.admin)

function handleSearchInput(searchHTMLElment: HTMLInputElement): void {
    const searchText: string = searchHTMLElment.value

    if (searchText.length >= 1) {
        const searchRegex: RegExp = new RegExp("^" + searchText.toLowerCase())
        const loggedInUserUsername: string = loggedInUser.value.credential.username

        const newSimilarUsers: User[] = [] as User[]

        allUsers.forEach((user: User) => {
            const userAccountName: string = user.accountDetail.name

            // Ensure the user isn't the loggedInUser
            if (user.credential.username !== loggedInUserUsername)
                if (searchRegex.test(userAccountName.toLowerCase()) === true)
                    newSimilarUsers.push(user)
        })

        similarUsers.value = newSimilarUsers
    } else {
        similarUsers.value = []
    }
}

function showDialogAddedFriendDialog(isAlreadyFriends: boolean, user: User): void {
    if (isAlreadyFriends === true) 
        notificationText.value = "Your already friends with " + user.accountDetail.name
    else 
        notificationText.value = "You just became friends with " + user.accountDetail.name
    
    showNotification.value = true

    setTimeout(() => {
        showNotification.value = false
        notificationText.value = ""
    }, 2000);
}

function handleSearching(possibleUserToAdd: User[]): void {
    if (possibleUserToAdd.length === 1) {
        let isAlreadyFriends: boolean = false

        const userToAdd = possibleUserToAdd[0]
        const userFriends: Friend[] = getFriends(loggedInUser.value)
        const userToAddUsername = userToAdd.credential.username

        // If the user is already friends with someone, then they shouldn't be able to friend them again
        userFriends.forEach((friendName: Friend) => {
            if (friendName.username === userToAddUsername) {
                isAlreadyFriends = true
            }
        })

        if (isAlreadyFriends === false) {
            addFriend(loggedInUser.value, userToAdd)
        }

        disableSearchModal()
        showDialogAddedFriendDialog(isAlreadyFriends, userToAdd)
    }

}

function toggleNavBarBurger(): void {
    navBarBurgerActive.value = !navBarBurgerActive.value
}

function enableSearchModal(): void {
    searchModalActive.value = true
}

function disableSearchModal(): void {
    searchModalActive.value = false
    if (searchInputElement !== null)
        if (searchInputElement.value !== null)
            searchInputElement.value.value = ""

    similarUsers.value = []
}

function handleSignOut(): void {
    setUserThatLoggedIn(default_user)
    router.push('/')
}

</script>

<template>
    <nav class="navbar">
        <div class="navbar-brand mx-2 is-flex is-justify-content-center is-align-content-center is-align-items-center">
            <i class="fas fa-solid fa-dumbbell icon-rotation"></i>
            <div class="navbar-burger" @click="toggleNavBarBurger" :class="{ 'is-active': navBarBurgerActive }">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div class="navbar-menu" :class="{ 'is-active': navBarBurgerActive }">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/dashboard">Dashboard</RouterLink>

                <RouterLink to="/goals" class="navbar-item">Add Goals</RouterLink>
                <RouterLink to="/friends" class="navbar-item">Friend's Activity</RouterLink>

                <!-- Enable the search modal -->
                <a class="navbar-item" @click="enableSearchModal">Find Workout Partners</a>
                <RouterLink to='/admin' class="navbar-item" v-if="isAdmin">Admin View</RouterLink>
            </div>

            <div class="navbar-end">
                <a class="navbar-item" @click="handleSignOut">Sign out</a>
            </div>
        </div>

        <!-- The search modal -->
        <div id="find-workout-partners-modal" class="modal" :class="{ 'is-active': searchModalActive }">
            <!-- If the modal's background gets clicked on then, hide the modal -->

            <div class="modal-background" @click="disableSearchModal"></div>
            <div class="modal-content">
                <div class="box">
                    <div class="field">
                        <label class="label is-size-6">Who would you like to workout with?</label>
                        <div class="control">
                            <input name="text-input" ref="searchInput" @input="handleSearchInput($refs.searchInput)"
                                type="text" class="input" placeholder="Their name"
                                @keyup.enter="handleSearching(similarUsers)" />
                        </div>
                    </div>

                    <div class="block" v-for="sUser in similarUsers">
                        <div class="is-flex is-flex-direction-flow block is-clickable"
                            @click="handleSearching([sUser])">
                            <img class="pr-2" :src="sUser.accountDetail.profilePicture"
                                :alt="'Picture of ' + sUser.accountDetail.name">
                            <p>{{ sUser.accountDetail.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- The notification that appears after the search is completed -->
        <div class="notification popup" v-if="showNotification">
            <p>{{ notificationText }}</p>
        </div>
    </nav>
</template>

<style>
.icon-rotation {
    transform: rotate(-20deg);
}

/* The CSS below was written by Llama 3.1 70B */
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>