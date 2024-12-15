<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterBar.vue'
import { getAllUserInfo, type User, deleteUser, updateUserInfo } from '../model/users';
import { getSession } from '../model/session';
import { useRouter } from 'vue-router'
import { type Ref, ref } from 'vue'

const { token, is_admin } = getSession()
const router = useRouter()

function generatePicture(str: string): string {
    switch (str) {
        case 'Girl':
            return '/src/assets/professional-woman.jpg'
        case 'Firefighter':
            return 'src/assets/professional-firefighter.jpg'
        case 'Default':
        case 'Guy':
        default:
            return '/src/assets/professional-man.jpg'
    }
}

if (token == null || is_admin == false)
    router.go(-1) // Only Admins should be able to find this page

const allUsers: Ref<User[]> = ref([])

if (token != null) {
    getAllUserInfo(token)
        .then(users => {
            if (!('message' in users)) {
                users.forEach(user => {
                    user.picture = generatePicture(user.picture)
                })

                allUsers.value = users
            }
        })
}

let userBeingDeleted = false

function deleteUserFromId(userId: number) {
    if (userBeingDeleted == false && token != null) {
        userBeingDeleted = true
        deleteUser(token, userId)
            .then(message => {
                console.log(message)
                allUsers.value = allUsers.value.filter(user => {
                    if (user.user_id != userId)
                        return user
                })

                userBeingDeleted = false
            })
    }
}


const userMessage: Ref<string> = ref('')
const editInProgress: Ref<boolean> = ref(false)
const isEditModalActive: Ref<boolean> = ref(false)
const newHandle: Ref<string> = ref('')
const newEmail: Ref<string> = ref('')
const newFullName: Ref<string> = ref('')
const newPassword: Ref<string> = ref('')
const newPicture: Ref<string> = ref('')
const isAdmin: Ref<boolean> = ref(is_admin || false)
const newIsAdminValue: Ref<boolean> = ref(false)
let userBeingEditted: number

function openEditModal(userId: number) {
    userBeingEditted = userId
    userMessage.value = "What would you like to edit?"
    isEditModalActive.value = true
}

function closeEditModal() {
    isEditModalActive.value = false
    editInProgress.value = false
    newHandle.value = ''
    newEmail.value = ''
    newFullName.value = ''
    newPassword.value = ''
    newPicture.value = ''
    newIsAdminValue.value = false
}

function editInputError(message?: string) {
    if (message != null)
        userMessage.value = message

    editInProgress.value = false
}

function completeEdit() {
    if (editInProgress.value == false) {
        editInProgress.value = true

        switch (newPicture.value) {
            case '':
            case 'Default':
            case 'Guy':
            case 'Girl':
            case 'Firefighter':
                break;
            default:
                return editInputError('The value for picture must be: "Default", "Guy", "Girl", "Firefighter" or nothing if you\'re not editting it')
        }

        if (token != null) {
            if (isAdmin.value == false)
                newIsAdminValue.value = false

            const newUser: User = {
                user_id: userBeingEditted,
                handle: newHandle.value,
                email: newEmail.value,
                full_name: newFullName.value,
                password: newPassword.value,
                picture: newPicture.value,
                is_admin: newIsAdminValue.value
            }

            updateUserInfo(token, userBeingEditted, newUser)
                .then(result => {
                    if ('message' in result) {
                        allUsers.value = allUsers.value.filter(user => {
                            if (user.user_id != userBeingEditted)
                                return user
                            else {
                                if (newHandle.value != '')
                                    user.handle = newHandle.value
                                if (newEmail.value != '')
                                    user.email = newEmail.value
                                if (newFullName.value != '')
                                    user.full_name = newFullName.value
                                if (newPassword.value != '')
                                    user.password = newPassword.value

                                return user
                            }
                        })

                        closeEditModal()
                    }
                })
        } else
            return editInputError("You don't have a session token. Try re-logging in")
    }
}

</script>

<template>
    <NavBar :current-page="'admin'" />

    <div class="is-flex is-flex-direction-column mx-6 mt-5">
        <div class="box cool-background is-flex is-flex-direction-row is-justify-content-center"
            v-for="user in allUsers">

            <figure class="image is-48x48 is-align-self-center">
                <img :src="user.picture" :alt="'Picture of the FitFusion user ' + user.handle" />
            </figure>

            <div class="vertical-line mx-5"></div>

            <div class="is-flex is-flex-direction-column is-align-items-center">
                <p class="white-text has-text-centered">User Handle: <br /> {{ user.handle }}</p>
                <div class="mt-3 mb-3 horizontal-line"></div>
                <p class="white-text has-text-centered">User Password: <br /> {{ user.password }}</p>
            </div>

            <div class="is-flex is-flex-direction-column is-align-items-center">
                <p class="white-text has-text-centered is-align-self-center">User email: <br /> {{ user.email }}</p>
                <div class="mt-3 mb-3 horizontal-line"></div>
                <p class="white-text has-text-centered is-align-self-center">User full name: <br /> {{ user.full_name }}
                </p>

            </div>

            <div class="vertical-line mx-5"></div>
            <p class="white-text has-text-centered is-align-self-center">Is this user an admin?: <br /> {{ user.is_admin
                }}</p>
            <div class="vertical-line mx-5 mr-4"></div>

            <button class="button mx-2" @click="deleteUserFromId(user.user_id)">
                <i class="fas fa-user-minus"></i>
            </button>

            <button class="button mx-2" @click="openEditModal(user.user_id)">
                <i class="fas fa-edit"></i>
            </button>
        </div>
    </div>

    <div class="modal" :class="{ 'is-active': isEditModalActive }">
        <div class="modal-background"></div>

        <div class="modal-content">
            <div class="box cool-background is-flex is-align-content-center is-flex-direction-column">
                <div
                    class="white-text has-text-centered mb-6 is-size-4 has-text-weight-bold text-wrap is-align-self-center">
                    {{ userMessage }}
                </div>

                <div class="field">
                    <p class="control has-icons-left" :class="{ 'is-loading': editInProgress }">
                        <input v-model="newHandle" class="input is-rounded" type="text" placeholder="New Handle" />
                        <span class="icon is-small is-left">
                            <i class="fas fa-solid fa-user"></i>
                        </span>
                    </p>
                </div>

                <div class="field">
                    <p class="control has-icons-left" :class="{ 'is-loading': editInProgress }">
                        <input v-model="newPassword" class="input is-rounded" type="password"
                            placeholder="New Password" />
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </p>
                </div>

                <div class="field">
                    <p class="control has-icons-left" :class="{ 'is-loading': editInProgress }">
                        <input v-model="newFullName" class="input is-rounded" type="text" placeholder="New full name" />
                        <span class="icon is-small is-left">
                            <i class="fas fa-fingerprint"></i>
                        </span>
                    </p>
                </div>

                <div class="field">
                    <p class="control has-icons-left" :class="{ 'is-loading': editInProgress }">
                        <input v-model="newEmail" class="input is-rounded" type="text" placeholder="New email" />
                        <span class="icon is-small is-left">
                            <i class="fas fa-envelope"></i>
                        </span>
                    </p>
                </div>


                <div class="field">
                    <p class="control has-icons-left" :class="{ 'is-loading': editInProgress }">
                        <input v-model="newPicture" class="input is-rounded" type="text"
                            placeholder="New picture (Only valid options are: Default, Guy, Girl, and Firefighter)" />
                        <span class="icon is-small is-left">
                            <i class="fas fa-image"></i>
                        </span>
                    </p>
                </div>

                <div class="is-flex is-align-items-center is-flex-direction-column" v-if="isAdmin">
                    <p class="mb-4 white-text">Would you like to make this user an Admin?</p>
                    <div class="field is-flex is-justify-content-center">
                        <label class="radio mx-2 white-text">
                            <input v-model="newIsAdminValue" class="radio" type='radio' value=true />
                            Yes
                        </label>

                        <label class="radio mx-2 white-text">
                            <input v-model="newIsAdminValue" class="radio" type='radio' value=false />
                            No
                        </label>
                    </div>
                </div>

                <button class="button is-align-self-center px-6 mt-5" @click="completeEdit">Finish edit</button>

            </div>
        </div>

        <button class="modal-close is-large" @click="closeEditModal"></button>
    </div>


    <div class="background-image"></div>
    <Footer />
</template>

<style scoped>
img {
    height: 100%;
}

.vertical-line {
    border-left: 3px solid black;
}

.horizontal-line {
    border-top: 3px solid black;
    width: 100%;
}

.cool-background {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: invert(100%) blur(2px);
    -webkit-backdrop-filter: invert(100%) blur(2px);
    /* Safari support */
}

.white-text {
    color: whitesmoke;
}

/* Background image */
.background-image {
    background: url('/src/assets/multiple-workouts-2.jpeg');
    background-size: contain;
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0px;
    top: 0px;
    filter: opacity(25%);
    z-index: -1;
}
</style>