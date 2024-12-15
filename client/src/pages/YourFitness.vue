<script setup lang="ts">
import { type Ref, ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterBar.vue'
import UserPost from '../components/UserPost.vue'
import { getLoggedInUserInformation, type User } from '../model/users'
import { getAllPosts, addPost, type Post, type NewPost, deletePost } from '../model/posts'
import { getSession } from '../model/session'
import { type Intensity, toIntensity, toNumber } from '../lib/intensity'

// Define the refs
const totalCaloriesBurned: Ref<number> = ref(0)
const totalActiveMinutes: Ref<number> = ref(0)
const averageWorkoutIntensity:Ref<Intensity> = ref('Average')

function calculateStatistics(posts: Post[]) {
    let totalCalories = 0
    let totalActive = 0
    let averageWorkout = 0

    for (const post of posts) {
        totalCalories += post.calories_burned
        totalActive += post.active_minutes
        averageWorkout += post.workout_intensity
    }

    averageWorkout = averageWorkout / posts.length

    totalCaloriesBurned.value = totalCalories
    totalActiveMinutes.value = totalActive
    averageWorkoutIntensity.value = toIntensity(averageWorkout)
}

function sortPosts(post1: Post, post2: Post) {
    const time1 = new Date(post1.post_date).getTime()
    const time2 = new Date(post2.post_date).getTime()

    return time2 - time1
}

// Load the session
const infoLoaded: Ref<boolean> = ref(false)
const userInformation: Ref<User | null> = ref(null)
const userPosts: Ref<Post[] | null> = ref(null)
const { token } = getSession()

function reGeneratePosts(token: string) {
    getLoggedInUserInformation(token)
        .then(result => {
            if ('picture' in result) {
                userInformation.value = result
                return result
            }
        })
        .then(user => {
            if (user != null) {
                if (user.user_id != null) {
                    getAllPosts(token, user.user_id)
                        .then(result => {
                            if (!('message' in result)) {
                                result.sort(sortPosts)

                                userPosts.value = result
                                calculateStatistics(result)
                                infoLoaded.value = true
                            }
                        })
                }
            }
        })
}

if (token != null) {
    reGeneratePosts(token)
}

// Define refs
const isModalActive: Ref<boolean> = ref(false)
const isCreatingPost: Ref<boolean> = ref(false)
const userMessage: Ref<string> = ref('')
const postContent: Ref<string> = ref('')
const postCaloriesBurned: Ref<string> = ref('')
const postActiveMinutes: Ref<string> = ref('')
const postWorkoutIntensity: Ref<Intensity> = ref('Average')

function openPostModal() {
    isModalActive.value = true
}

function closePostModal() {
    isModalActive.value = false
}

function createPostInputError(message: string) {
    userMessage.value = message
    isCreatingPost.value = false
}

function createPostSuccess(newPost: NewPost) {
    isModalActive.value = false
    userMessage.value = ""
    postContent.value = ""
    postCaloriesBurned.value = ""
    postActiveMinutes.value = ""
    postWorkoutIntensity.value = 'Average'

    if (token != null) {
        reGeneratePosts(token)
    }

    isCreatingPost.value = false
}

function createNewPost() {
    if (isCreatingPost.value == false) {
        isCreatingPost.value = true

        const caloriesBurned: number = parseInt(postCaloriesBurned.value)
        const activeMinutes: number = parseInt(postActiveMinutes.value)
        const workoutIntensity: number = toNumber(postWorkoutIntensity.value)
        
        // Ensure the post is formatted correctly
        if (Number.isNaN(caloriesBurned))
            return createPostInputError('Calories burned must be an integer')
        
        if (Number.isNaN(activeMinutes))
            return createPostInputError('Active minutes must be an integer')

        if (token != null) {
            getLoggedInUserInformation(token)
                .then(result => {
                    if ('message' in result)
                        return createPostInputError(result.message)

                    const todaysDate: Date = new Date()
                    const postDate: string = todaysDate.toISOString().split('T')[0]

                    const newPost: NewPost = {
                        user_id: result.user_id,
                        post_date: postDate,
                        content: postContent.value,
                        calories_burned: caloriesBurned,
                        active_minutes: activeMinutes,
                        workout_intensity: workoutIntensity
                    }

                    addPost(token, newPost)
                        .then(result => {
                            if (result.message == 'Post added')
                                createPostSuccess(newPost)
                            else
                                createPostInputError(result.message)
                        })
                })

        }
    }
}
let deletingPost: boolean = false

function removePost(post: Post) {
    if (deletingPost === false) {
        deletingPost = true

        if (token != null) {
            deletePost(token, post.post_id)
                .then(result => {
                    if ('message' in result) {
                        console.log(result.message)
                    }

                    if (userPosts.value == null) {
                        userPosts.value = []
                    }

                    userPosts.value = userPosts.value.filter(userPost => {
                        if (userPost.post_id != post.post_id)
                            return userPost
                    })

                    calculateStatistics(userPosts.value)

                    deletingPost = false
                })
        }
    }
}
</script>

<template>
    <NavBar :current-page="'your-fitness'"/>

    <div class="is-flex is-flex-direction-column">

        <!-- Your stats -->
        <div class="grid mt-6 mx-6">
            <div class="cell cool-background white-text has-text-centered center-content pill-effect">
                <div>You've burned <b>{{ totalCaloriesBurned }}</b> Calories in total</div>
            </div>
            <div class="cell cool-background white-text has-text-centered center-content pill-effect">
                <div>You've been active for <b>{{ totalActiveMinutes }}</b> minutes</div>
            </div>
            <div class="cell cool-background white-text has-text-centered center-content pill-effect">
                <div>You're average workout intensity is <b>{{ averageWorkoutIntensity }}</b></div>
            </div>
        </div>
        
        <!-- Add post -->
        <button class="button white-text mx-6 mt-5 mb-6 cool-background" @click="openPostModal">Create another post</button>

        <div class="modal" :class="{'is-active': isModalActive}">
            <div class="modal-background"></div>
            <div class="modal-content is-size-5">
                <div class="box cool-background is-flex is-align-content-center is-flex-direction-column">
                    <h1 class="title has-text-centered white-text">New Post</h1>
                    <h2 class="subtitle white-text">{{ userMessage }}</h2>

                    <div class="field">
                        <p class="white-text" >What did you do?</p>
                        <p class="control has-icons-left" :class="{'is-loading': isCreatingPost}">
                            <textarea v-model="postContent" class="textarea input" rows=5 placeholder="Nothing"/>
                            <span class="icon is-small is-left">
                                <i class="fas fa-comment-alt"></i>
                            </span>
                        </p>
                    </div>

                    <div class="is-flex is-flex-direction-row is-align-content-center is-justify-content-center">
                        <div class="field mx-2">
                            <p class="white-text">How many calories did you burn?</p>
                            <div class="control has-icons-left" :class="{'is-loading': isCreatingPost}">
                                <input v-model="postCaloriesBurned" class="input" type='text' placeholder="0"/>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-bolt"></i>
                                </span>
                            </div>
                        </div>

                        <div class="field mx-2">
                            <p class="white-text" >How many minutes were you active?</p>
                            <div class="control has-icons-left" :class="{'is-loading': isCreatingPost}">
                                <input v-model="postActiveMinutes" class="input" type='text' placeholder="0"/>
                                <span class="icon is-small is-left">
                                    <i class="fas fa-clock"></i>
                                </span>
                            </div>
                        </div>

                    </div>
                    
                    <div class="is-flex is-align-items-center is-flex-direction-column">
                        <p class="mb-4 white-text">How intense was your workout?</p>
                        <div class="field is-flex is-justify-content-center">
                            <label class="radio mx-2 white-text">
                                <input v-model="postWorkoutIntensity" class="radio" type='radio' value="Extreme"/>
                                Extreme
                            </label>
    
                            <label class="radio mx-2 white-text">
                                <input v-model="postWorkoutIntensity" class="radio" type='radio' value="Strong"/>
                                Strong
                            </label>
    
                            <label class="radio mx-2 white-text">
                                <input v-model="postWorkoutIntensity" class="radio" type='radio' value="Average"/>
                                Average
                            </label>
    
                            <label class="radio mx-2 white-text">
                                <input v-model="postWorkoutIntensity" class="radio" type='radio' value="Okay"/>
                                Okay
                            </label>
    
                            <label class="radio mx-2 white-text">
                                <input v-model="postWorkoutIntensity" class="radio" type='radio' value="Weak"/>
                                Weak
                            </label>
                        </div>
                    </div>

                    <button class="button mt-6 mb-2" @click="createNewPost">Create post</button>
                </div>
            </div>

            <button class="modal-close is-large" @click="closePostModal"></button>
        </div>

        <!-- Your posts -->
        <div v-if="userPosts != null && userInformation != null" class="grid is-col-min-10 is-gap-8 mx-6">
            <div class="cell white-text" v-for="post of userPosts">
                <UserPost :user="userInformation" :post="post"></UserPost>

                <button class="button white-text cool-background" @click="removePost(post)">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
        
        <div class="box mx-6 mt-6 mb-6 cool-background" v-else>
            <p class="white-text has-text-centered">You have no posts</p>
        </div>
    </div>
    <div class="background-image"></div>
    <Footer />
</template>

<style scoped>

.input:hover, .input:focus, .input:focus-within, .button:hover {
	border-color: #ec3642;
	box-shadow: var(--bulma-input-focus-shadow-size) hsla(356, 83%, 57%, 60%);
}

.center-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.pill-effect {
    border-radius: 0.25rem;
    height: 5rem;
}

.white-text {
    color: whitesmoke;
}

b {
    color: white;
    font-weight: bolder;
}

.cool-background {
	background-color: rgba(0, 0, 0, 0.7);
	backdrop-filter: invert(100%) blur(2px);
	-webkit-backdrop-filter: invert(100%) blur(2px); /* Safari support */
}

/* Background image */
.background-image {
	background: url('/src/assets/multiple-workouts-more-detailed.jpeg');
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