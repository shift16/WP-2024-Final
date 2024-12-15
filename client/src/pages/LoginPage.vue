<script setup lang="ts">
import { loadSession, getSession, createSession } from '../model/session'
import { type Ref, ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import Footer from '../components/FooterBar.vue'
import { useRouter } from 'vue-router'
import { type NewUser } from '../model/users'

// This page should not be accessible if the user is logged in
const router = useRouter()
const currentSession = getSession()

if (currentSession.token != null)
	router.go(-1)

const userHandle: Ref<string> = ref('')
const userPassword: Ref<string> = ref('')
const userMessage: Ref<string> = ref('Welcome back!')
const isAttemptingLogin: Ref<boolean> = ref(false)

const isAttemptingSignUp: Ref<boolean> = ref(false)
const isSignUpView: Ref<boolean> = ref(false)
const userPicture: Ref<string> = ref('')
const userEmail: Ref<string> = ref('')
const userFullName: Ref<string> = ref('')

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

function signUpInputError(message?: string) {
	userMessage.value = message || 'The handle or email already exists'
	isAttemptingSignUp.value = false
}

function signUpInputSuccess() {
	router.push('/your-fitness')
	isAttemptingSignUp.value = false
}

function attemptSignUp() {
	isAttemptingSignUp.value = true

	if (userEmail.value == '')
		return signUpInputError('You must provide an email')

	if (userFullName.value == '')
		return signUpInputError('You must provide a full name')

	if (userHandle.value == '')
		return signUpInputError('You must provide a handle')

	if (userPassword.value == '')
		return signUpInputError('You must provide a password')

	const newUser: NewUser = {
		picture: userPicture.value,
		email: userEmail.value,
		full_name: userFullName.value,
		is_admin: false,
		handle: userHandle.value,
		password: userPassword.value
	}

	if (newUser.picture == '') {
		newUser.picture = 'Default'
	} else {
		switch (newUser.picture) {
			case 'Default':
			case 'Guy':
			case 'Girl':
			case 'Firefighter':
				break;
			default:
				return signUpInputError('The value for picture must be: "Default", "Guy", "Girl" or "Firefighter"')

		}
	}

	createSession(newUser)
		.then(result => {
			if ('message' in result)
				signUpInputError(result.message)
			else
				signUpInputSuccess()
		})
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
			
			<div v-if="isSignUpView" class="field">
				<p class="control has-icons-left" :class="{'is-loading': isAttemptingLogin || isAttemptingSignUp}">
					<input v-model="userFullName" class="input is-rounded" type="text" placeholder="Your full name" />
					<span class="icon is-small is-left">
						<i class="fas fa-fingerprint"></i>
					</span>
				</p>
			</div>

			<div v-if="isSignUpView" class="field">
				<p class="control has-icons-left" :class="{'is-loading': isAttemptingLogin || isAttemptingSignUp}">
					<input v-model="userEmail" class="input is-rounded" type="text" placeholder="Your email" />
					<span class="icon is-small is-left">
						<i class="fas fa-envelope"></i>
					</span>
				</p>
			</div>


			<div v-if="isSignUpView" class="field">
				<p class="control has-icons-left" :class="{'is-loading': isAttemptingLogin || isAttemptingSignUp}">
					<input v-model="userPicture" class="input is-rounded" type="text" placeholder="Your picture (Only valid options are: Default, Guy, Girl, and Firefighter)" />
					<span class="icon is-small is-left">
						<i class="fas fa-image"></i>
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