<script setup lang="ts">
import { getSession } from '../model/session';
import { getFriendsPosts, type Post } from '../model/posts';
import UserPost from '../components/UserPost.vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterBar.vue'
import { ref, type Ref } from 'vue';
import { getUserInfo, type UserPublicInfo, getAllUserInfo, getLoggedInUserInformation } from '../model/users';
import { addFriend, removeFriend } from '../model/friends';
import { generatePicture } from '../lib/picture';

type UserToPost = {
    user: UserPublicInfo,
    post: Post
}

const { token } = getSession()
const userMessage: Ref<string> = ref('')
const isThereAMessage: Ref<boolean> = ref(false)
const didPostsLoad: Ref<boolean> = ref(false)
const friendsToPosts: Ref<UserToPost[]> = ref([])
const usersFriends: Ref<UserPublicInfo[]> = ref([])
let loggedInUserHandle: string | null

function sortPosts(post1: Post, post2: Post) {
    const time1 = new Date(post1.post_date).getTime()
    const time2 = new Date(post2.post_date).getTime()

    return time2 - time1
}

function isUserInArr(arr: UserToPost[], userHandle: string): boolean {
    for (const userInfo of arr) {
        if (userInfo != null)
            if (userInfo.user.handle == userHandle)
                return true
    }

    return false
}

function generatePosts(token: string) {
    return getFriendsPosts(token)
        .then(friendPosts => {
            if ('message' in friendPosts) {
                userMessage.value = friendPosts.message
            } else {
                friendPosts.sort(sortPosts)
                const userToPost: UserToPost[] = []
                let postsAdded = 0

                friendPosts.forEach((friendPost, index) => {
                    getUserInfo(token, friendPost.user_id)
                        .then(userInfo => {
                            if ('message' in userInfo)
                                userMessage.value = userInfo.message
                            else if (userInfo != null) {
                                if (!isUserInArr(userToPost, userInfo.handle)) {
                                    let friend = userInfo
                                    friend.picture = friend.picture
                                    usersFriends.value.push(friend)
                                }

                                userToPost[index] = {
                                    user: userInfo,
                                    post: friendPost
                                }
                            }
                            
                            postsAdded++

                            if (postsAdded === friendPosts.length) {
                                friendsToPosts.value = userToPost
                                didPostsLoad.value = true
                            }
                        })
                })
            }
        })
}

if (token != null) {
    getLoggedInUserInformation(token)
        .then(userInfo => {
            if (!('message' in userInfo)) {
                loggedInUserHandle = userInfo.handle
            }
        })

    generatePosts(token)
}

const removeModalActive: Ref<boolean> = ref(false)
const addModalActive: Ref<boolean> = ref(false)
const isRemovingFriend: Ref<boolean> = ref(false)
const isAddingFriend: Ref<boolean> = ref(false)
const possibleFriends: Ref<UserPublicInfo[]> = ref([])
const friendsToRemove: Ref<UserPublicInfo[]> = ref([])

function toggleAddModal() {
    addModalActive.value = !addModalActive.value

    if (token != null) {
            getAllUserInfo(token)
                .then(users => {
                    if (!('message' in users)) {
                        possibleFriends.value = []
                        for (const user of users) {
                            if (!isUserInArr(friendsToPosts.value, user.handle)) {
                                if (loggedInUserHandle != null) {
                                    if (user.handle != loggedInUserHandle) {

                                        const userToAdd: UserPublicInfo = {
                                            picture: generatePicture(user.picture),
                                            user_id: user.user_id,
                                            email: user.email,
                                            full_name: user.full_name,
                                            handle: user.handle
                                        }
        
                                        possibleFriends.value.push(userToAdd)
                                    }
                                }
                            }
                        }
                        
                    }
                    else
                        console.error(users.message)
                })
    }
}

function updateRemoveMenu() {
    friendsToRemove.value = usersFriends.value.map(userInfo => {
        return {
            picture: generatePicture(userInfo.picture),
            user_id: userInfo.user_id,
            email: userInfo.email,
            full_name: userInfo.full_name,
            handle: userInfo.handle
        }
    })
}

function toggleRemoveModal() {
    removeModalActive.value = !removeModalActive.value
    updateRemoveMenu()
}

function removeFriendFromId(userHandle: string) {
    if (isRemovingFriend.value == false) {
        isRemovingFriend.value = true
        
        if (token != null) {
            removeFriend(token, userHandle)
                .then(message => {
                    if (message != null)
                        console.log(message.message)

                    friendsToPosts.value = friendsToPosts.value.filter(userToPost => {
                        if (userToPost.user.handle != userHandle)
                            return userToPost
                    })

                    usersFriends.value = usersFriends.value.filter(friend => {
                        if (friend.handle != userHandle)
                            return friend
                    })

                    updateRemoveMenu()

                    isRemovingFriend.value = false
                })
        }
    }
}

function addNewFriend(newFriendHandle: string) {
    if (isAddingFriend.value == false && token != null) {
        isAddingFriend.value = true

        addFriend(token, newFriendHandle)
            .then(result => {
                if ('message' in result)
                    console.log(result.message)

                possibleFriends.value = possibleFriends.value.filter(userInfo => {
                    if (userInfo.handle != newFriendHandle)
                        return userInfo
                })

                generatePosts(token)
                    .then(_ => {
                        isAddingFriend.value = false
                    })
            })
    }
}

</script>

<template>
    <NavBar :current-page="'friends'" />
    <div v-if="isThereAMessage" class="block">
        <h1 class="title">{{ userMessage }}</h1>
    </div>

    <div class="mt-6 mx-6 is-flex is-justify-content-center">
        <button class="button is-align-self-center px-6 mx-6 is-size-4 white-text cool-background"
            @click="toggleAddModal">
            Add friend
        </button>
        <button class="button is-align-self-center px-6 mx-6 is-size-4 white-text cool-background"
            @click="toggleRemoveModal">
            Remove friend
        </button>
    </div>

    <div class="modal" :class="{'is-active': removeModalActive}">
        <div class="modal-background"></div>

        <div class="modal-content box cool-background">
            <p class="white-text">Who would you like to remove as a friend?</p>

            <div v-for="user in friendsToRemove">
                <div class="mt-5 mb-5 is-flex is-justify-content-flex-start is-align-content-center">

                    <figure class="image is-48x48">
                        <img :src="user.picture" :alt="'Picture of the FitFusion user ' + user.handle" />
                    </figure>

                    <p class="white-text is-align-self-center mx-3 mb-5 mr-6">@{{ user.handle }}</p>
    
                    <button class="button mx-6 px-5 pt-5 pb-5" @click="removeFriendFromId(user.handle)">
                        <i class="fas fa-user-minus"></i>
                    </button>
                </div>
            </div>
        </div>

        <button class="modal-close is-large" @click="toggleRemoveModal"></button>
    </div>

    <div class="modal" :class="{'is-active': addModalActive}">
        <div class="modal-background"></div>

        <div class="modal-content box cool-background">
            <p class="white-text">Who would you like to add as a friend?</p>
            
            <div v-for="user in possibleFriends">
                <div class="mt-5 mb-5 is-flex is-justify-content-flex-start is-align-content-center">

                    <figure class="image is-48x48">
                        <img :src="user.picture" :alt="'Picture of the FitFusion user ' + user.handle" />
                    </figure>

                    <p class="white-text is-align-self-center mx-3 mb-5 mr-6">@{{ user.handle }}</p>
    
                    <button class="button mx-6 px-5 pt-5 pb-5" @click="addNewFriend(user.handle)">
                        <i class="fas fa-user-plus"></i>
                    </button>
                </div>
            </div>
        
        </div>

        <button class="modal-close is-large" @click="toggleAddModal"></button>
    </div>


    <div v-if="didPostsLoad" class="grid is-col-min-10 is-gap-8 mx-6 mt-6">
        <div class="cell white-text" v-for="post in friendsToPosts">
            <UserPost :user="post.user" :post="post.post" />
        </div>
    </div>

    <div class="box mx-6 mt-6 mb-6 cool-background" v-else>
        <p class="white-text has-text-centered">You have no friends, or they haven't posted anything</p>
    </div>

    <div class="background-image"></div>
    <Footer />
</template>

<style scoped>

.white-text {
    color: whitesmoke;
}

.input:hover, .input:focus, .input:focus-within, .button:hover {
	border-color: #ec3642;
	box-shadow: var(--bulma-input-focus-shadow-size) hsla(356, 83%, 57%, 60%);
}

.cool-background {
	background-color: rgba(0, 0, 0, 0.7);
	backdrop-filter: invert(100%) blur(2px);
	-webkit-backdrop-filter: invert(100%) blur(2px); /* Safari support */
}

/* Background image */
.background-image {
	background: url('/src/assets/multiple-workouts.jpeg');
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