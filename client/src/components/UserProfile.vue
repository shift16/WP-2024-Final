<script setup lang="ts">
    import {ref, type Ref} from 'vue'
    import { type UserPublicInfo } from '../model/users';
    import type { Post } from 'src/model/posts';
    
    const props = defineProps<{
        user: UserPublicInfo,
        post: Post
    }>()

    const userToShow = props.user
    const postToShow = props.post

    const usersPicture: Ref<string> = ref(userToShow.picture)
    const usersActualName: Ref<string> = ref(userToShow.full_name)
    const usersHandle: Ref<string> = ref(userToShow.handle)
    const usersPostContent: Ref<string> = ref(postToShow.content) 
    const usersPostDate: Ref<string> = ref(postToShow.post_date.toDateString())
    const usersPostDateDirect: Ref<string> = ref(postToShow.post_date.toISOString())

   
</script>

<template>
    <div class="tempblock mt-6">
        <div class="tempblock2"style="width: 30%;">
            <div class="card color-override red-shadow">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img :src="usersPicture" :alt="'Picture of the FitFusion user ' + usersHandle" />
                    </figure>
                </div>
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
                        <time :datetime="usersPostDateDirect">{{ usersPostDate }}</time>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    a {
        --bulma-link-text: #ec3642;
    }
    
    .red-shadow {
        box-shadow: 
        0.75rem 0.75rem 1rem #ec3642,
        -0.75rem -0.75rem 1rem #ec3642;
    }
    
    .red-shadow:hover {
        animation: red-glow infinite ease 3s;
    }

    @keyframes red-glow {
        0% {
            box-shadow: 
                0.75rem 0.75rem 1rem #ec3642,
                -0.75rem -0.75rem 1rem #ec3642;
        }

        50% {
            box-shadow: 
                0.75rem 0.75rem 1rem #dd7279,
                -0.75rem -0.75rem 1rem #dd7279;
        }

        100% {
            box-shadow: 
                0.75rem 0.75rem 1rem #ec3642,
                -0.75rem -0.75rem 1rem #ec3642;
        }
    }

    .color-override {
        color: white;
        background-color: black;
    }

    .tempblock {
        width: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
    }
</style>

<!-- ec3642 Darker color -->
<!-- e05760 - Lighter Color -->