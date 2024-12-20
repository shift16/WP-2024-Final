<script setup lang="ts">

import { RouterLink } from 'vue-router'
import { ref, type Ref } from 'vue'
import { getSession, endSession } from '../model/session'
import { getLoggedInUserInformation } from '../model/users';
import SearchBar from '../components/SearchBar.vue'

const props = defineProps<{
    currentPage: string
}>()

const isHomeActive: Ref<Boolean> = ref(props.currentPage === 'home')
const isAboutActive: Ref<Boolean> = ref(props.currentPage === 'about')
const isYourFitnessPageActive: Ref<Boolean> = ref(props.currentPage === 'your-fitness')
const isFriendsPageActive: Ref<Boolean> = ref(props.currentPage === 'friends')
const isAdminPageActive: Ref<Boolean> = ref(props.currentPage === 'admin')
const isLoginPageActive: Ref<Boolean> = ref(props.currentPage === 'login')

const isBurgerActive: Ref<Boolean> = ref(false)
const isLoggedIn: Ref<Boolean> = ref(false)
const isAdmin: Ref<Boolean> = ref(false)

const { token, is_admin } = getSession()

if (token != null && is_admin != null) {
    isLoggedIn.value = true // For instant update of the webpage
    isAdmin.value = is_admin

    getLoggedInUserInformation(token)
        .then(userInfo => {
            if (!('message' in userInfo)) {
                isLoggedIn.value = true
                isAdmin.value = userInfo.is_admin
            } else {
                isLoggedIn.value = false // Just in case the session token expired
                isAdmin.value = false
                console.log(userInfo.message)
            }
        })
}

function toggleNavBarBurger() {
    isBurgerActive.value = !isBurgerActive.value
}

const isSearchModalActive: Ref<boolean> = ref(false)

function toggleSearchModal() {
    isSearchModalActive.value = !isSearchModalActive.value
}

</script>

<template>
    <nav class="navbar transparent-background">
        <div class="navbar-brand set-text-color-white">
            <RouterLink to="/" class="is-flex is-align-content-center is-justify-content-center is-align-items-center navbar-logo px-1">
                <div class="has-text-weight-bold is-size-5 mx-2">FitFusion</div>
                <i class="fas fa-solid fa-dumbbell icon-rotation icon-size"></i>
            </RouterLink>
            <button class="navbar-burger" @click="toggleNavBarBurger" :class="{ 'is-active': isBurgerActive }">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <div class="navbar-menu has-text-weight-bold is-size-6-5 transparent-background" :class="{ 'is-active': isBurgerActive }">
            <div class="navbar-start">
                <RouterLink class="navbar-item" :class="{ 'active-page': isHomeActive }" to="/">Home</RouterLink>
                <RouterLink class="navbar-item" :class="{ 'active-page': isYourFitnessPageActive, 'hidden': !isLoggedIn }" to="/your-fitness">Your Fitness</RouterLink>
                <RouterLink class="navbar-item" :class="{ 'active-page': isFriendsPageActive, 'hidden': !isLoggedIn }" to="/friends">Friend's Activity</RouterLink>
                <a class="navbar-item" :class="{'hidden': !isLoggedIn}" @click="toggleSearchModal">Find People</a>
                <RouterLink class="navbar-item" :class="{ 'active-page': isAboutActive }" to="/about">About Us</RouterLink>
            </div>

            <div class="navbar-end">
                <RouterLink class="navbar-item" :class="{ 'active-page': isAdminPageActive, 'hidden': !(isAdmin && isLoggedIn) }" to='/admin'>Admin View</RouterLink>
                <RouterLink class="navbar-item" v-if="!isLoggedIn" :class="{ 'active-page': isLoginPageActive }" to="/login">Login or Sign up</RouterLink>
                <RouterLink class="navbar-item" v-else @click="endSession" to="/login">Logout</RouterLink>
            </div>
        </div>
    </nav>

    <div class="modal" :class="{'is-active': isSearchModalActive}">
        <div class="modal-background"></div>

        <div class="modal-content">
            <SearchBar />
        </div>

        <button class="modal-close is-large" @click="toggleSearchModal"></button>
    </div>
</template>

<style scoped>
/* A bunch of custom styling  */
.navbar-burger:hover {
    background-color: #ec3642;
}

.hidden {
    display: none;
}

.is-size-6-5 {
    font-size: medium;
}

.icon-rotation {
    transform: rotate(-20deg);
}

.icon-size {
    font-size: 1.25rem;
}

.transparent-background {
    background-color: rgba(0, 0, 0, 0);
}

.set-text-color-white {
    color: whitesmoke;
    --bulma-link-text: white;
    --bulma-navbar-burger-color: white;
}

a.navbar-item {
    --bulma-navbar-item-color: white;
    background-color: rgba(0, 0, 0, 0);
}

.navbar-item:hover {
    background-color: #ec3642;
}

.navbar-logo:hover {
    background-color: #ec3642;
}

.active-page {
    border-bottom: 0.4rem solid #ec3642;
}
</style>