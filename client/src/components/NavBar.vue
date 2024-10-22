<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <!-- To add -->

            <div class="navbar-burger">
                <!-- To add -->
            </div>
        </div>

        <div class="navbar-menu">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/dashboard">Activity Dashboard</RouterLink>
                <div class="navbar-item has-dropdown is-hoverable">
                    <div class="navbar-link">Progress</div>

                    <div class="navbar-dropdown">
                        <RouterLink to="/my-progress" class="navbar-item">My Progress</RouterLink>
                        <RouterLink to="/group-progress" class="navbar-item">Group Progress</RouterLink>
                    </div>
                </div>
                <RouterLink class="navbar-item" to="/finder">Find Workout Partners</RouterLink>
            </div>

            <div class="navbar-end">
                
            </div>
        </div>

    </nav>
</template>
