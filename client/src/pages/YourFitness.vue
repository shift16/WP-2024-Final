<script setup lang="ts">
import { type Ref, ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterBar.vue'
import UserPost from '../components/UserPost.vue'
import { getLoggedInUserInformation, type User } from '../model/users'
import { getAllPosts, addPost, type Post } from '../model/posts'
import { getSession } from '../model/session'
import { type Intensity, toIntensity } from '../lib/intensity'

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

// Load the session
const infoLoaded: Ref<boolean> = ref(false)
const userInformation: Ref<User | null> = ref(null)
const userPosts: Ref<Post[] | null> = ref(null)
const { token } = getSession()

if (token != null) {
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
                                userPosts.value = result
                                calculateStatistics(result)
                                infoLoaded.value = true
                            }
                        })
                }
            }
        })
}

function openCreatePostModal() {

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
        <button class="button white-text mx-6 mt-5 mb-6 cool-background" @click="openCreatePostModal">Create another post</button>

        

        <!-- Your posts -->
        <div v-if="userPosts != null && userInformation != null" class="grid is-gap-8 mx-6">
            <div class="cell" v-for="post in userPosts">
                <UserPost :user="userInformation" :post="post"></UserPost>
            </div>
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