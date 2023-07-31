<script setup lang="ts">
definePageMeta({
	layout: "auth",
});

const loginOrSignup = () => {};
const loginWithGoogle = () => {};
const gotoForgotPassword = () => navigateTo({ name: "forgot-password" });
const gotoSignup = () => navigateTo({ name: "register" });
</script>

<template>
	<div class="login-form flex flex-column">
		<div class="login-form__header flex flex-column">
			<h4 class="login-form__title heading-xl primary-text">Log in</h4>
			<p class="login-form__description body-l primary-text">Enter your credentials to access your account.</p>
		</div>
		<div class="login-form__google">
			<button class="flex items-center content-center border-xs primary-text body-l" @click="loginWithGoogle">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google">
					<path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
					<path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
					<path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
					<path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
				</svg>
				Log in with Google
			</button>
		</div>
		<span class="or-text body-l">or</span>
		<div class="login-form__body">
			<form class="login-form__form flex flex-column" @submit.prevent="loginOrSignup">
				<BaseInput id="email" label="Email Address" placeholder="name@company.com" />
				<BaseInput id="password" label="Password" placeholder="name12345">
					<template #label><span class="primary-color-text cursor-pointer" @click="gotoForgotPassword">Forgot password?</span></template>
				</BaseInput>
				<BaseCheckbox id="remember" name="remember" label="Remember information" :has-background="false" />
				<BaseButton radius="small">Login</BaseButton>
			</form>
		</div>
		<div class="login-form__footer">
			<p class="body-m medium-grey-text">Not a member? <span class="primary-color-text cursor-pointer" @click="gotoSignup">Signup</span></p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.login-form {
	gap: 3rem;

	&__header {
		gap: 0.5rem;
	}

	&__google {
		button {
			background-color: var(--body-background);
			border: 0.1rem solid rgba(130, 143, 163, 0.25);
			width: 100%;
			padding: 1.5rem 3rem;
			gap: 1rem;
			font-weight: 600;
		}
	}

	&__form {
		gap: 3rem;
	}
}

.or-text {
	overflow: hidden;
	text-align: center;
	color: rgba(130, 143, 163, 0.5);

	&:before,
	&:after {
		background-color: rgba(130, 143, 163, 0.5);
		content: "";
		display: inline-block;
		height: 1px;
		position: relative;
		vertical-align: middle;
		width: 50%;
	}

	&:before {
		right: 1rem;
		margin-left: -50%;
	}

	&:after {
		left: 1rem;
		margin-right: -50%;
	}
}
</style>
