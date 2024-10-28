<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { getUserThatLoggedIn, type NutritionGoal, type User, type WorkoutGoal } from '@/model/users';
import router from '@/router';
import { useTemplateRef } from 'vue';


const goalHeaderField = useTemplateRef('goal-header')
const goalBodyField = useTemplateRef('goal-body')
const loggedInUser: User = getUserThatLoggedIn()

function handleAddingGoal(goalType: string): void {
    const goalHeaderText: string | undefined = goalHeaderField.value?.value
    const goalBodyText: string | undefined = goalBodyField.value?.value

    if (goalHeaderText !== undefined && goalBodyText !== undefined) {
        let goalToAdd: WorkoutGoal | NutritionGoal
        
        if (goalType === 'Nutrition Goal') {
            goalToAdd = {
                'nutritionHeader': goalHeaderText,
                'nutrientValue': 10,
                'nutrientDesiredValue': 20
            }

            loggedInUser.nutritionGoals.push(goalToAdd)
        } else if (goalType === 'Workout Goal') {
            goalToAdd = {
                'goalHeader': goalHeaderText,
                'goalBody': goalBodyText,
                'goalType': 'workout',
                'isActive': false,
                'isRecent': false,
                'progress': 0
            }

            loggedInUser.workoutGoals.push(goalToAdd)
        }

        router.push('/dashboard')
    }
}

</script>

<template>
    <NavBar></NavBar>
    <div class="field center-content">
        <form class="box center-self">
            <div class="field">
                <label for="goal-header" class="label is-size-6">Goal Title</label>
                <div class="control">
                    <input name="goal-header" type="text" ref="goal-header" class="input" placeholder="Title" />
                </div>
            </div>

            <div class="field">
                <label for="goal-body" class="label is-size-6">Goal Description</label>
                <div class="control">
                    <textarea name="goal-body" ref="goal-body" class="input" placeholder="Description"></textarea>
                </div>
            </div>

            <div class="field">
                <label class="label">Type of Goal</label>
                <div class="control">
                    <div class="select">
                        <select ref="goal-selection">
                            <option>Workout Goal</option>
                            <option>Nutrition Goal</option>
                        </select>
                    </div>
                </div>
            </div>

            <a class="button is-size-6 is-fullwidth is-primary" @click="handleAddingGoal($refs['goal-selection'].value)">Add</a>
        </form>
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
</style>