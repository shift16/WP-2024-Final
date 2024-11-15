<script setup lang="ts">
import { getUser, getUserThatLoggedIn, type User, type Friend, type WorkoutGoal, getRecentWorkouts } from 'model/users';
import { getFriends } from 'model/friends';
import { ref, type Ref } from 'vue';
import GoalCard from 'components/GoalCard.vue';
import NavBar from 'components/NavBar.vue';

const loggedInUser: Ref<User> = ref(getUserThatLoggedIn())
const loggedInUserFriends: Ref<Friend[]> = ref(getFriends(loggedInUser.value))



function getFriendName(friend: Friend): string {
    const user: User = getUser(friend.username)

    return user.accountDetail.name
}

function getRecentActivity(friend: Friend): WorkoutGoal[] {
    const user: User = getUser(friend.username)
    const recentWorkouts: WorkoutGoal[] = getRecentWorkouts(user)

    return recentWorkouts
}

</script>

<template>
    <NavBar></NavBar>
    <div class="is-flex is-flex-direction-column center-content">
        <div class="is-flex is-flex-direction-row box center-self" v-for="friend in loggedInUserFriends">
            <p class="block mx-5 center-text center-self">{{ getFriendName(friend) }}'s recent activity</p>
            <GoalCard v-for="workout in getRecentActivity(friend)" :current-progress="workout.progress">
                <template #card-title>{{ workout.goalHeader }}</template>
                <template #card-content>{{ workout.goalBody }}</template>
                <template #progress-bar></template>
            </GoalCard>
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

.center-text {
    text-align: center;
}

</style>