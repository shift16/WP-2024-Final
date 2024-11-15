<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import EmbeddedCard from '../components/EmbeddedCard.vue';
import GoalCard from '../components/GoalCard.vue';
import { getUserThatLoggedIn, type User, type WorkoutGoal, getActiveWorkout } from 'model/users';
import { ref, type Ref } from 'vue';

const loggedInUser: Ref<User> = ref(getUserThatLoggedIn())

</script>

<template>
  <NavBar></NavBar> <!-- Add the Navbar -->
  <div class="columns ml-5 mr-5 mt-5">
    <div class="column message is-one-third">
      <h1 class="message-header">{{ loggedInUser.accountDetail.name }}'s Current Activity</h1>
      <div class="message-body">
        <GoalCard :current-progress="getActiveWorkout(loggedInUser).progress">
          <template #card-title>{{ getActiveWorkout(loggedInUser).goalHeader }}</template>
          <template #card-content>{{ getActiveWorkout(loggedInUser).goalBody }}</template>
          <template #progress-bar></template>
        </GoalCard>
      </div>
    </div>

    <div class="column message">
      <h1 class="message-header has-text-centered">Workout Goals</h1>
      <div class="message-body is-flex is-flex-direction-row apply-gap">
        <div class="workout-goal-container" v-for="workoutGoal in loggedInUser.workoutGoals">
          <GoalCard :current-progress="workoutGoal.progress">
            <template #card-title>{{ workoutGoal.goalHeader }}</template>
            <template #card-content>{{ workoutGoal.goalBody }}</template>
            <template #progress-bar></template>
          </GoalCard>
        </div>
      </div>
    </div>
  </div>

  <div class="columns ml-5 mr-5">
    <div class="column message">
      <h1 class="message-header">Nutrition Goals</h1>
      <div class="message-body">
        <div class="is-flex is-flex-direction-row">
          <div class="nutrient-element is-flex is-flex-direction-row" v-for="(nGoal, index) in loggedInUser.nutritionGoals">
            <EmbeddedCard>
              <template #card-title>{{ nGoal.nutritionHeader }}</template>
              <template #top-content>{{ nGoal.nutrientValue }}</template>
              <template #bottom-content>{{ nGoal.nutrientDesiredValue }}</template>
            </EmbeddedCard>

            <div class="vertical-divider ml-5 mr-5" v-if="index !== loggedInUser.nutritionGoals.length - 1"></div>
          </div>      
        </div>
      </div>
    </div>

    <div class="column message">
      <h1 class="message-header">Goal Statistics</h1>
      <p class="message-body">
        <!-- TODO Add stats! -->
        <div class="is-flex center-flex is-flex-direction-column">
          <EmbeddedCard>
            <template #card-title>Workout Goals Completed</template>
            <template #top-content>0</template>
          </EmbeddedCard>

          <EmbeddedCard>
            <template #card-title>Nutrition Goals Completed</template>
            <template #top-content>0</template>
          </EmbeddedCard>
        </div>
      </p>
    </div>
  </div>
</template>

<style>

.center-flex {
  justify-content: center;
  align-content: center;
}

.vertical-divider {
  border-left: 1px solid #ccc;
}

.apply-gap {
  gap: 0 2rem;
}

</style>