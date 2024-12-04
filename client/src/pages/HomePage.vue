<script setup lang='ts'>
	import BackgroundImage from '../components/BackgroundImage.vue';
	import NavBar from '../components/NavBar.vue'
	import Footer from '../components/Footer.vue'
	import { RouterLink } from 'vue-router'

</script>

<template>
	<NavBar :current-page="'home'"></NavBar>
	<div class="block ml-6 mt-5">
		<h1 class="font-very-large has-text-weight-bold set-text-color-white">
			CONSISTENCY LEADS TO SUCCESS
		</h1>
		<RouterLink to="login" class="has-text-weight-bold set-text-color-white is-size-5 red-underline force-fit-content make-an-account-link">
			MAKE AN ACCOUNT TODAY
		</RouterLink>
	</div>

	<BackgroundImage :background-image-name="'multiple-workouts.jpeg'"></BackgroundImage>
	<Footer />
</template>

<style scoped>
	/* Make the title slightly larger */
	.font-very-large {
		font-size: 4rem;
	}

	/* Limit size of the content */
	.force-fit-content {
		width: fit-content;
	}

	/* CSS for the make-an-account-link */
	.make-an-account-link {
		border-bottom: .25rem solid #ec3642;
		transition: border-bottom 500ms ease;
	}
	
	/* Adds a nice animation to the make an account button */
	.make-an-account-link:hover {
		border-bottom: .5rem solid #ec3642;
	}

	/* Set the color of the text to white */
	.set-text-color-white {
        color: white;
    }
</style>