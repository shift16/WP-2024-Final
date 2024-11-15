<script setup lang="ts">
import NavBar from 'components/NavBar.vue';
import { getUsers, type User, removeUser, getUserThatLoggedIn, getUser, default_user } from 'model/users';
import { ref, type Ref } from 'vue';

const allUsers: Ref<User[]> = ref(getUsers())

const loggedInUser: Ref<User> = ref(getUserThatLoggedIn())
const editModalActive: Ref<boolean> = ref(false)
const userBeingEditted: Ref<User> = ref(default_user)

// const newNameTag = useTemplateRef('new-name-tag')
// const newProfilePicture = useTemplateRef('new-profile-picture-tag')
// const newEmailTag = useTemplateRef('username-tag')
// const yesInputTag = useTemplateRef('yes-input')
// const noInputTag = useTemplateRef('no-input')

function deleteUser(userToDelete: string): void {
    // Ensure the user being deleted is not the currentUser
    if (loggedInUser.value.credential.username !== userToDelete) {
        removeUser(userToDelete)
        allUsers.value = getUsers()
    }
}

function disableEditModal(): void {
    editModalActive.value = false

    if (newNameTag.value !== null && newProfilePicture.value !== null && newEmailTag.value) {
        newNameTag.value.value = ""
        newProfilePicture.value.value = ""
        newEmailTag.value.value = ""
    }

    userBeingEditted.value = default_user
}

function enableEditModal(userToEdit: string): void {
    if (userToEdit !== loggedInUser.value.credential.username) {
        userBeingEditted.value = getUser(userToEdit)
        editModalActive.value = true
    }
}

function handleEditUser(): void {
    if (yesInputTag.value !== null && noInputTag.value !== null && newNameTag.value !== null && newProfilePicture.value !== null && newEmailTag.value) {
        editModalActive.value = false

        let addAdmin: boolean = false
        
        if (yesInputTag.value.checked)
            addAdmin = true

        const newName: string = newNameTag.value.value
        const newProfilePictureLink: string = newProfilePicture.value.value
        const newEmailName: string = newEmailTag.value.value
        
        userBeingEditted.value.permission.admin = addAdmin

        if (newName !== '')
            userBeingEditted.value.accountDetail.name = newName
        

        if (newProfilePictureLink !== '')
            userBeingEditted.value.accountDetail.profilePicture = newProfilePictureLink

        if (newEmailName !== '')
            userBeingEditted.value.credential.email = newEmailName

        disableEditModal()
    }
}

</script>

<template>
    <NavBar></NavBar>
    <div class="center-content">
        <table class="table is-bordered center-self">
            <thead>
                <tr>
                    <th>First and Last Name</th>
                    <th>Profile Picture</th>
                    <th>Email</th>
                    <th>Is Admin</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in allUsers">
                    <th>{{ user.accountDetail.name }}</th>
                    <th>{{ user.accountDetail.profilePicture }}</th>
                    <th>{{ user.credential.email }}</th>
                    <th>{{ user.permission.admin }}</th>
                    <th class="is-flex is-flex-direction-row">
                        <button class="button" @click="deleteUser(user.credential.username)">
                            <i class="fas fa-trash"></i>
                        </button>

                        <button class="button mx-2" @click="enableEditModal(user.credential.username)">
                            <i class="fas fa-edit"></i>
                        </button>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="modal" :class="{ 'is-active': editModalActive }">

        <!-- If the modal's background gets clicked on then, hide the modal -->
        <div class="modal-background" @click="disableEditModal"></div>
        <div class="modal-content">
            <div class="box">
                <div class="field">
                    <label for="new-name" class="label is-size-6">New Name</label>
                    <div class="control">
                        <input name="new-name" type="text" ref="new-name-tag" class="input"
                            placeholder="Input new name or leave it blank to not change it" />
                    </div>
                </div>

                <div class="field">
                    <label for="new-profile-picture" class="label is-size-6">New Profile Picture</label>
                    <div class="control">
                        <input name="new-profile-picture" type="text" ref="new-profile-picture-tag" class="input"
                            placeholder="Input new profile picture link or leave it blank to not change it" />
                    </div>
                </div>

                <div class="field">
                    <label for="new-username" class="label is-size-6">New Email</label>
                    <div class="control">
                        <input name="new-username" type="text" ref="username-tag" class="input"
                            placeholder="Input new email or leave it blank to not change it" />
                    </div>
                </div>

                <div class="field">
                    <label class="label is-size-6">Make Admin?</label>
                    <div class="control">
                        <label class="radio mx-2">
                            <input ref="yes-input" type="radio" name="question">
                            Yes
                        </label>
                        <label class="radio">
                            <input ref="no-input" type="radio" name="question">
                            No
                        </label>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" @click="handleEditUser">Confirm changes</button>
                    </div>
                    <div class="control">
                        <button class="button is-link is-light" @click="disableEditModal">Cancel</button>
                    </div>
                </div>

            </div>
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