<script setup lang="ts">
import { ref, type Ref } from "vue"
import { findUserFromName, getUserInfo, type UserPublicInfo } from "../model/users"
import { getSession } from "../model/session"
import { generatePicture } from "../lib/picture";

const availableOptions: Ref<string[]> = ref([])
const userInfo: Ref<UserPublicInfo> | Ref<null> = ref(null) 
const selectedQuery: Ref<string> = ref('')
let requestedUserId: number | null = null

const { token } = getSession()

function viewUserDetails() {
    if (token != null) {
        findUserFromName(token, selectedQuery.value)
            .then(users => {
                const inputtedName = selectedQuery.value

                if (!('message' in users)) {
                    users.forEach(user => {
                        if (inputtedName.toLowerCase() == user.full_name.toLowerCase()) {
                            requestedUserId = user.user_id
                        }
                    })

                    if (requestedUserId != null) {
                        getUserInfo(token, requestedUserId)
                            .then(info => {
                                if ('user_id' in info)
                                    userInfo.value = info
                            })
                    }
                }
            })


    }
}

function updateOptions(inputtedName: string) {
    if (token != null) {
        if (inputtedName != '') {
            findUserFromName(token, inputtedName)
                .then(users => {
                    if (!('message' in users)) {
                        let newAvailableOptions = [] as string[]

                        users.forEach(user => {
                            newAvailableOptions.push(user.full_name)

                            if (inputtedName.toLowerCase() == user.full_name.toLowerCase()) {
                                requestedUserId = user.user_id
                            }
                        })

                        availableOptions.value = newAvailableOptions
                    }
                })
        } else {
            availableOptions.value = []
        }
    }
}

</script>

<template>
    <div class="cool-background is-size-5 set-text-color-white box">

        <section>
            <o-field label="Type the name of someone you would like to friend">
                <o-autocomplete @input="updateOptions" v-model="selectedQuery" :options="availableOptions" rounded expanded
                    placeholder="Their name" icon="search" clearable open-on-focus>
                    <template #empty>No results found or no input provided</template>
                </o-autocomplete>
            </o-field>
        </section>

        <button class="button px-4 mt-6 set-text-color-white cool-background" @click="viewUserDetails">
            View Details
        </button>

        <div v-if="userInfo != null">
            <div class="card color-override red-shadow cool-background mt-6">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img :src="generatePicture((userInfo as UserPublicInfo).picture)"
                                    :alt="'Picture of the FitFusion user ' + (userInfo as UserPublicInfo).handle" />
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="is-size-4">{{ (userInfo as UserPublicInfo).full_name }}</p>
                            <p class="is-size-6">@{{ (userInfo as UserPublicInfo).handle }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.red-shadow {
    box-shadow:
        0.75rem 0.75rem 1rem #ec3642,
        -0.75rem -0.75rem 1rem #ec3642;
}

.color-override {
    color: whitesmoke;
    background-color: black;
}

.set-text-color-white {
    color: whitesmoke;
    --bulma-link-text: white;
    --bulma-navbar-burger-color: white;
}

.cool-background {
	background-color: rgba(0, 0, 0, 0.7);
	backdrop-filter: invert(100%) blur(2px);
	-webkit-backdrop-filter: invert(100%) blur(2px); /* Safari support */
}
</style>