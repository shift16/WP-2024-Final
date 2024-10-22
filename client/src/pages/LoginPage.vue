<script setup lang="ts">

import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="center-content">
        <form class="box center-self">
            <div class="field">
                <label for="email-input" class="label is-size-6">Username or email address</label>
                <div class="control">
                    <input name="email-input" type="email" class="input" placeholder="johndoe@example.com"/>
                </div>
            </div>

            <div class="field">
                <label for="password-input" class="label is-size-6">Password</label>
                <div class="control">
                    <input name="password-input" type="password" class="input" placeholder="********"/>
                </div>
            </div>

            <RouterLink to="/dashboard" class="button is-size-6 is-fullwidth is-primary">Sign in</RouterLink>
        </form>

        <div class="box center-self">
            Don't have an account? <RouterLink to="/sign-up">Click here</RouterLink>
        </div>
    </div>
</template>

<style>

.center-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    width: 100vw;
    height: 100vh;
}

.center-self {
    align-self: center;
}


</style>