<script setup lang='ts'>
	import NavBar from '../components/NavBar.vue'
</script>

<template>
	<NavBar></NavBar>

	<img class="background-image" src="../assets/background.jpeg">

</template>

<style>
	.background-image {
		position: absolute;
		left: calc(50vw - 512px);
	}
</style>