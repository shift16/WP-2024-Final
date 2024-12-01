<script setup lang='ts'>
	import NavBar from '../components/NavBar.vue'
</script>

<template>
	<NavBar :current-page="'home'"></NavBar>
	<h1 class="title has-text-weight-bold set-color-white ml-6 mt-6">
		CONSISTENCY LEADS TO SUCCESS
	</h1>

	<div class="background-image"></div>
</template>

<style>
	.background-image {
		background: url('../assets/background2.jpeg');
		background-size: contain;
		width: 100vw;
		height: 100vh;
		position: absolute;
		left: 0px;
		top: 0px;
		filter: opacity(35%);
		z-index: -1;
	}

	.title {
		font-size: 5rem;
	}

	.set-color-white {
        color: whitesmoke;
        --bulma-link-text: white;
        --bulma-navbar-burger-color: white;
    }
</style>