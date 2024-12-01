<script setup lang="ts">
    import { RouterLink } from 'vue-router'
    import { ref, type Ref } from 'vue'

    const props = defineProps({
        currentPage: String
    })

    const theCurrentPage: String = props.currentPage || 'not found!'
    const isHomeActive: Boolean = theCurrentPage === 'home'
    const isAboutActive: Boolean = theCurrentPage === 'about'
    const isFitnessTrackerActive: Boolean = theCurrentPage === 'tracker'
    const isStatsPageActive: Boolean = theCurrentPage === 'stats'
    const isFriendsPageActive: Boolean = theCurrentPage === 'friends'
    const isFindFriendsModalActive: Boolean = theCurrentPage === 'search'

    const isBurgerActive: Ref<Boolean> = ref(false)

    function toggleNavBarBurger() {
        isBurgerActive.value = !isBurgerActive.value
    }


</script>

<template>
    <nav class="navbar transparent-background">
        <div class="navbar-brand set-color-white">
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

        <div class="navbar-menu has-text-weight-bold transparent-background">
            <div class="navbar-start">
                <RouterLink class="navbar-item" :class="{'active-page': isHomeActive}" to="/">Home</RouterLink>
                <RouterLink class="navbar-item" :class="{'active-page': isAboutActive}" to="/about">About Us</RouterLink>
                <RouterLink class="navbar-item" :class="{'active-page': isFitnessTrackerActive}" to="/tracker">Fitness Tracker</RouterLink>
                <RouterLink class="navbar-item" :class="{'active-page': isStatsPageActive}" to='/stats'>Your Statistics</RouterLink>
                <RouterLink class="navbar-item" :class="{'active-page': isFriendsPageActive}" to="/friends">Friend's Activity</RouterLink>
                <RouterLink class="navbar-item" :class="{'active-page': isFindFriendsModalActive}" to='/search'>Find Friends</RouterLink>
            </div>

            <div class="navbar-end">
                <RouterLink class="navbar-item" to='/admin'>Admin View</RouterLink>
                <RouterLink class="navbar-item" to="/login">Login</RouterLink>
            </div>
        </div>
    </nav>
</template>

<style>
    /* A bunch of custom styling  */
    .navbar-burger:hover {
        background-color: #ec3642;
    }

    .icon-rotation {
        transform: rotate(-20deg);
    }

    .icon-size {
        font-size: 20px;
    }

    .transparent-background {
        background-color: rgba(0, 0, 0, 0);
    }

    .set-color-white {
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
        border-bottom: 6px solid #ec3642;
    }
</style>