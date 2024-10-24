<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue'

const searchModalActive = ref(false)

function enableSearchModal() {
    searchModalActive.value = true
}

function disableSearchModal() {
    searchModalActive.value = false
}

</script>

<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <!-- To add -->

            <div class="navbar-burger">
                <!-- To add -->
            </div>
        </div>

        <div class="navbar-menu">
            <div class="navbar-start">
                <RouterLink class="navbar-item" to="/dashboard">Activity Dashboard</RouterLink>
                <div class="navbar-item has-dropdown is-hoverable">
                    <div class="navbar-link">Progress</div>

                    <div class="navbar-dropdown">
                        <RouterLink to="/my-progress" class="navbar-item">My Progress</RouterLink>
                        <RouterLink to="/group-progress" class="navbar-item">Group Progress</RouterLink>
                    </div>
                </div>

                <!-- Enable the search modal -->
                <a class="navbar-item" @click="enableSearchModal">Find Workout Partners</a>

                <!-- The search modal -->
                <div id="find-workout-partners-modal" class="modal" :class="{'is-active': searchModalActive}">
                    <!-- If the modal's background gets clicked on then, hide the modal -->

                    <div class="modal-background" @click="disableSearchModal"></div>
                    <div class="modal-content">
                        <div class="box field">
                            <label for="search-" class="label is-size-6">Wh</label>
                            <div class="control">
                                <input name="text-input" type="text" class="input" placeholder="Type here" @keyup.enter="disableSearchModal"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="navbar-end">

            </div>
        </div>

    </nav>
</template>
