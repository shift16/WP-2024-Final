<script setup lang="ts">

import { type UserPublicInfo, type User } from '../model/users'
import { type Post } from '../model/posts'
import { toIntensity } from '../lib/intensity'
import { generatePicture } from '../lib/picture';

const props = defineProps<{
    user: UserPublicInfo | User,
    post: Post
}>()

function generateIntensity(): string {
    return toIntensity(props.post.workout_intensity)
}
</script>

<template>
    <div class="card color-override red-shadow cool-background">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img :src="generatePicture(user.picture)" :alt="'Picture of the FitFusion user ' + user.handle" />
                    </figure>
                </div>
                <div class="media-content">
                    <p class="is-size-4">{{ user.full_name }}</p>
                    <p class="is-size-6">@{{ user.handle }}</p>
                </div>
            </div>

            <div class="content">
                {{ post.content }}
                <br />
                <div class="mb-3"></div>
                <div class="is-size-7"><b>{{ post.calories_burned }}</b> Calories burned </div>
                <div class="is-size-7"><b>{{ post.active_minutes }}</b> minutes active </div>
                <div class="is-size-7">This workouts intensity was <b>{{ generateIntensity() }}</b></div>
                <div class="right-aligned">
                    <time class="is-size-7" :datetime="post.post_date">{{ post.post_date }}</time>
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