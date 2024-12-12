<script setup lang="ts">
import { loadSession, getSession, createSession } from '../model/session'
import { type Ref, ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterBar.vue'
import { useRouter } from 'vue-router'

// This page should not be accessible if the user is logged in
const router = useRouter()
const currentSession = getSession()

if (currentSession.token != null)
	router.go(-1)

const userHandle: Ref<String> = ref('')
const userPassword: Ref<String> = ref('')
const userMessage: Ref<String> = ref('Welcome back!')
const isAttemptingLogin: Ref<Boolean> = ref(false)
const isAttemptingSignUp: Ref<Boolean> = ref(false)
const isSignUpView: Ref<Boolean> = ref(false)

function loginInputError() {
	userMessage.value = 'Incorrect handle or password'
	isAttemptingLogin.value = false
}

function loginInputSuccess() {
	router.push('/your-fitness')
	isAttemptingLogin.value = false
}

function attemptLogin() {
	isAttemptingLogin.value = true
	loadSession(userHandle.value, userPassword.value)
		.then(result => {
			if ('message' in result)
				loginInputError()
			else 
				loginInputSuccess()
		})
}

function attemptSignUp() {
	isAttemptingLogin.value = true
}

function activateSignUp() {
	userMessage.value = "Type a unique handle and secure password and we'll handle everything else"
	isSignUpView.value = true
}

</script>

<template>
	<NavBar :current-page="'login'" />
	
	<div class="is-flex is-align-items-center is-justify-content-center size-of-viewport">

		<div class="box cool-background resizing-background is-flex is-align-content-center is-flex-direction-column">
			<div class="is-flex is-flex-direction-row is-align-items-center mb-3 mt-3 is-justify-content-center white-text">
				<div class="has-text-weight-bold is-size-2 mx-2">FitFusion</div>
				<i class="fas fa-solid fa-dumbbell icon-rotation icon-size"></i>
			</div>

			<div class="white-text has-text-centered mb-6 is-size-4 has-text-weight-bold text-wrap is-align-self-center">
				{{ userMessage }}
			</div>
			
			<div class="field">
				<p class="control has-icons-left" :class="{'is-loading': isAttemptingLogin || isAttemptingSignUp}">
					<input v-model="userHandle" class="input is-rounded" type="text" placeholder="Your Handle" />
					<span class="icon is-small is-left">
						<i class="fas fa-solid fa-user"></i>
					</span>
				</p>
			</div>

			<div class="field">
				<p class="control has-icons-left" :class="{'is-loading': isAttemptingLogin || isAttemptingSignUp}">
					<input v-model="userPassword" class="input is-rounded" type="password" placeholder="Your Password" />
					<span class="icon is-small is-left">
						<i class="fas fa-lock"></i>
					</span>
				</p>
			</div>

			<button class="button is-align-self-center px-6" v-if="!isSignUpView" @click="attemptLogin">Login</button>
			<button class="button is-align-self-center px-6" v-else @click="attemptSignUp">Sign up</button>

			<button class="button mx-5 mt-6" :class="{'hidden': isSignUpView}" @click="activateSignUp">Don't have an account? Click here!</button>
		</div>
	</div>
		
	<div class="background-image"></div>
	<Footer />
</template>

<style scoped>
/* Some styling */
.hidden {
	display: none;
}

.input:hover, .input:focus, .input:focus-within, .button:hover {
	border-color: #ec3642;
	box-shadow: var(--bulma-input-focus-shadow-size) hsla(356, 83%, 57%, 60%);
}

.text-wrap {
	max-width: 80%;
	overflow-wrap: break-word;
}

.size-of-viewport {
	height: 80vh;
}

.icon-rotation {
    transform: rotate(-20deg);
}

.icon-size {
    font-size: 2.5rem;
}

.white-text {
	color: white;
}

.resizing-background {
	max-width: 60%;
	transition: transform 0.5s ease;
}

.resizing-background:hover {
	transform: scale(1.15);
}

.cool-background {
	background-color: rgba(0, 0, 0, 0.7);
	backdrop-filter: invert(100%) blur(2px);
	-webkit-backdrop-filter: invert(100%) blur(2px); /* Safari support */
}

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