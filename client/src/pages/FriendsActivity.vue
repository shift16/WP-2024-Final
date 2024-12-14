<script setup lang="ts">
import { getSession } from '../model/session';
import { getFriendsPosts, type Post } from '../model/posts';
import UserPost from '../components/UserPost.vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterBar.vue'
import { ref, type Ref } from 'vue';
import { getUserInfo, type UserPublicInfo } from '../model/users';

type UserToPost = {
    user: UserPublicInfo,
    post: Post
}

const { token } = getSession()
const userMessage: Ref<string> = ref('')
const isThereAMessage: Ref<boolean> = ref(false)
const friendsToPosts: Ref<UserToPost[]> = ref([])
const didPostsLoad: Ref<boolean> = ref(false)

function sortPosts(post1: Post, post2: Post) {
    const time1 = new Date(post1.post_date).getTime()
    const time2 = new Date(post2.post_date).getTime()

    return time2 - time1
}

if (token != null) {
    getFriendsPosts(token)
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
                            else
                                userToPost[index] = {
                                    user: userInfo,
                                    post: friendPost
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

</script>

<template>
    <NavBar :current-page="'friends'"/>
    <div v-if="isThereAMessage" class="block">
        <h1 class="title">{{ userMessage }}</h1>
    </div>

    <div v-if="didPostsLoad" class="grid is-col-min-10 is-gap-8 mx-6 mt-6">
        <div class="cell white-text" v-for="post in friendsToPosts">
            <UserPost :user="post.user" :post="post.post"/>
        </div>
    </div>

    <div class="background-image"></div>
    <Footer />
</template>

<style scoped>
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