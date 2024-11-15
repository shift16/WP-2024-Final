<script setup lang="ts">
    import { RouterLink } from 'vue-router'

</script>

<template>
    <nav class="navbar transparent-background">
        <div class="navbar-brand">
            <RouterLink class="icon-size navbar-item" to='/'>
                <i class="fas fa-solid fa-dumbbell icon-rotation"></i>
                <button class="navbar-burger" @click="toggleNavBarBurger" :class="{ 'is-active': navBarBurgerActive }">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div class="has-text-weight-bold">FitFusion</div>
            </RouterLink>
        </div>

        <div class="navbar-menu has-text-weight-bold">
            <div class="navbar-start">
                <RouterLink class="navbar-item active-page" to="/">Home</RouterLink>
                <RouterLink class="navbar-item" to="/about">About Us</RouterLink>
                <RouterLink class="navbar-item" to="/tracker">Fitness Tracker</RouterLink>
                <RouterLink class="navbar-item" to='/stats'>Your Statistics</RouterLink>
                <RouterLink class="navbar-item" to="/friends">Friend's Activity</RouterLink>
                <RouterLink class="navbar-item" to='/search'>Find Friends</RouterLink>
            </div>

            <div class="navbar-end">
                <RouterLink class="navbar-item" to='/admin'>Admin View</RouterLink>
                <RouterLink class="navbar-item" to="/login">Login</RouterLink>
            </div>
        </div>
    </nav>
</template>

<style>
    .icon-rotation {
        transform: rotate(-20deg);
    }

    .icon-size {
        font-size: 20px;
    }

    .transparent-background {
        background-color: rgba(0, 0, 0, 0);
    }

    a.navbar-item {
        --bulma-navbar-item-color: white;
        background-color: rgba(0, 0, 0, 0);
    }

    .navbar-item:hover {
        background-color: #ec3642;
    }

    .active-page {
        border-bottom: 6px solid #ec3642;
    }
</style>