<script setup lang="ts">

import { RouterLink } from 'vue-router';
import { getUsers, type Credential } from '@/model/users';
import { useTemplateRef, ref } from 'vue'
import router from '@/router';

const users = getUsers()

function isValid(providedUsername: String, providedPassword: String): Boolean {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const actualUsername = user.credential.username
        const actualPassword = user.credential.password

        if (actualPassword === providedPassword && actualUsername === providedUsername) {
            return true
        }
    }

    return false
}

const usernameField = useTemplateRef('username-tag')
const passwordField = useTemplateRef('password-tag')
const inputtedContentWrong = ref(false)

function handleSignUp(): void {
    const usernameFieldValue = usernameField.value?.value
    const passwordFieldValue = passwordField.value?.value

    if (usernameFieldValue != undefined && passwordFieldValue != undefined) {
        if (isValid(usernameFieldValue, passwordFieldValue)) {
            router.push('/dashboard')
        } else {
            inputtedContentWrong.value = true
        }

    }

    // I have to ensure these fields are not undefined
    // I want to ensure that the username and password is correct. If they are correct, then send them to the next page,
    // Else add the class is-danger (possibly with a conditional :class)

}
</script>

<template>
    <div class="center-content">
        <form class="box center-self">
            <div class="field">
                <label for="username" class="label is-size-6">Username</label>
                <div class="control">
                    <input name="username" type="text" ref="username-tag" class="input"
                        :class="{ 'is-danger': inputtedContentWrong }" placeholder="johndoe123"
                        @keyup.enter="handleSignUp" />
                </div>
            </div>

            <div class="field">
                <label for="password-input" class="label is-size-6">Password</label>
                <div class="control">
                    <input name="password-input" type="password" ref="password-tag" class="input"
                        :class="{ 'is-danger': inputtedContentWrong }" placeholder="***********"
                        @keyup.enter="handleSignUp" />
                </div>
            </div>

            <a class="button is-size-6 is-fullwidth is-primary" @click="handleSignUp">Sign in</a>
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