<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import EmbeddedCard from '../components/EmbeddedCard.vue';
import GoalCard from '../components/GoalCard.vue';
import ModalComponent from '../components/ModalComponent.vue';

</script>

<template>
  <NavBar></NavBar>
  <ModalComponent></ModalComponent>
  <div class="columns ml-6 mr-6 mt-6">
    <div class="column message is-one-third">
      <h1 class="message-header">Latest Activity</h1>
      <div class="message-body">
        <GoalCard :current-progress="10">
          <template #card-title>Walk 10 Miles</template>
          <template #card-content>Walk 10 miles around campus</template>
          <template #progress-bar></template>
        </GoalCard>
      </div>
    </div>

    <div class="column message">
      <h1 class="message-header has-text-centered">Recent Active Goals</h1>
      <div class="message-body is-flex is-flex-direction-row apply-gap">
        <GoalCard>
          <template #card-title>Run 10 miles</template>
          <template #card-content>Go to New Paltz and run around campus</template>
          <template #progress-bar ></template>
        </GoalCard>

        <GoalCard>
          <template #card-title>Hike at Mohonk</template>
          <template #card-content>Go to Mohonk Preserve and hike with Kamala Harris</template>
          <template #progress-bar></template>
        </GoalCard>

        <GoalCard>
          <template #card-title>Hike at Minnewaska</template>
          <template #card-content>Go to Minnewaska State Park Preserve and hike with Brandon</template>
          <template #progress-bar></template>
        </GoalCard>
      </div>
    </div>
  </div>

  <div class="columns ml-6 mr-6">
    <div class="column is-two-thirds message">
      <h1 class="message-header">Nutrition</h1>
      <div class="message-body">
        <div class="is-flex is-flex-direction-row">        
          
          <EmbeddedCard>
            <template #card-title>Calories</template>
            <template #top-content>0</template>
            <template #bottom-content>1000</template>
          </EmbeddedCard>
          
          <div class="vertical-divider ml-5 mr-5"></div>

          <EmbeddedCard>
            <template #card-title>Protein</template>
            <template #top-content>0</template>
            <template #bottom-content>?</template>
          </EmbeddedCard>

          <div class="vertical-divider ml-5 mr-5"></div>

          <EmbeddedCard>
            <template #card-title>Calories</template>
            <template #top-content>0</template>
            <template #bottom-content>1000</template>
          </EmbeddedCard>

          <div class="vertical-divider ml-5 mr-5"></div>

          <EmbeddedCard>
            <template #card-title>Calories</template>
            <template #top-content>0</template>
            <template #bottom-content>1000</template>
          </EmbeddedCard>
        </div>
      </div>
    </div>

    <div class="column message">
      <h1 class="message-header">Workout Stats</h1>
      <p class="message-body">
        <div class="is-flex center-flex is-flex-direction-column">
          <EmbeddedCard>
            <template #card-title>Calories Burned</template>
            <template #top-content>0</template>
            <template #bottom-content>{{null}}</template>
          </EmbeddedCard>

          <EmbeddedCard>
            <template #card-title>Total Duration</template>
            <template #top-content>0</template>
            <template #bottom-content>{{ null }}</template>
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