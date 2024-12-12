<script setup lang="ts">
import { loadSession, getSession, createSession } from '../model/session'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterBar.vue'

</script>

<template>
    <NavBar :current-page="'login'"/>
    

    <div class="background-image"></div>
    <Footer />
</template>

<style scoped>

/* Background image */
.background-image {
	background: url('/src/assets/multiple-workouts-2.jpeg');
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