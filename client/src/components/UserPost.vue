<script setup lang="ts">

import { ref, type Ref } from 'vue'
import { type UserPublicInfo, type User } from '../model/users'
import { type Post } from '../model/posts'
import { type Intensity, toIntensity } from '../lib/intensity'


const props = defineProps<{
    user: UserPublicInfo | User,
    post: Post
}>()

const userToShow = props.user
const postToShow = props.post

let validPicture: string
switch (userToShow.picture) {
    case 'Girl':
        validPicture = '/src/assets/professional-woman.jpg'
        break
    case 'Firefighter':
        validPicture = 'src/assets/professional-firefighter.jpg'
        break
    case 'Default':
    case 'Guy':
    default:
        validPicture = '/src/assets/professional-man.jpg'
        break
}

const usersPicture: Ref<string> = ref(validPicture)
const usersActualName: Ref<string> = ref(userToShow.full_name)
const usersHandle: Ref<string> = ref(userToShow.handle)
const usersPostContent: Ref<string> = ref(postToShow.content)
const usersPostDate: Ref<string> = ref(postToShow.post_date)
const usersPostDateDirect: Ref<string> = ref(new Date(postToShow.post_date).toISOString())

const caloriesBurned: Ref<number> = ref(postToShow.calories_burned)
const activeMinutes: Ref<number> = ref(postToShow.active_minutes)
const workoutIntensity: Ref<Intensity> = ref(toIntensity(postToShow.workout_intensity))

</script>

<template>
    <div class="card color-override red-shadow cool-background">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img :src="usersPicture" :alt="'Picture of the FitFusion user ' + usersHandle" />
                    </figure>
                </div>
                <div class="media-content">
                    <p class="is-size-4">{{ usersActualName }}</p>
                    <p class="is-size-6">@{{ usersHandle }}</p>
                </div>
            </div>

            <div class="content">
                {{ usersPostContent }}
                <br />
                <div class="mb-3"></div>
                <div class="is-size-7"><b>{{ caloriesBurned }}</b> Calories burned </div>
                <div class="is-size-7"><b>{{ activeMinutes }}</b> minutes active </div>
                <div class="is-size-7">This workouts intensity was <b>{{ workoutIntensity }}</b></div>
                <div class="right-aligned">
                    <time class="is-size-7" :datetime="usersPostDateDirect">{{ usersPostDate }}</time>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.cool-background {
	background-color: rgba(0, 0, 0, 0.7);
	backdrop-filter: invert(100%) blur(2px);
	-webkit-backdrop-filter: invert(100%) blur(2px); /* Safari support */
}

a {
    --bulma-link-text: #ec3642;
}

.red-shadow {
    box-shadow:
        0.75rem 0.75rem 1rem #ec3642,
        -0.75rem -0.75rem 1rem #ec3642;
}

.right-aligned {
    text-align: right;
}

.color-override {
    color: whitesmoke;
    background-color: black;
}
</style>

<!-- ec3642 Darker color -->
<!-- e05760 - Lighter Color -->