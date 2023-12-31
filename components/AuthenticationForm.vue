<script setup lang="ts">
interface Props {
	mode: "login" | "signup";
}
const supabaseClient = useSupabaseClient();
const { fetchBoards } = useBoardStore();
const { mode = "login" } = defineProps<Props>();

const formData = reactive({
	email: "",
	password: "",
	remember: true,
});
const isLoading = ref(false);

const loginOrSignup = async () => {
	if (formData.password === "" || formData.email === "") {
		useEvent("notify", { type: "error", message: "You need to fill all required fields" });
		return;
	}
	isLoading.value = true;
	if (mode === "login") {
		const { error } = await supabaseClient.auth.signInWithPassword({ email: formData.email, password: formData.password });
		if (error) {
			isLoading.value = false;
			useEvent("notify", { type: "error", message: error.message });
			return;
		}
		await fetchBoards();
		useEvent("notify", { type: "success", message: "Signed in successfully. Welcome back!" });
		navigateTo({ name: "dashboard" }, { replace: true });
		isLoading.value = false;
	} else if (mode === "signup") {
		const { error } = await supabaseClient.auth.signUp({ email: formData.email, password: formData.password });
		if (error) {
			isLoading.value = false;
			useEvent("notify", { type: "error", message: error.message });
			return;
		}
		await fetchBoards();
		isLoading.value = false;
		useEvent("notify", { type: "success", message: "Account created successfully. Have fun!" });
		navigateTo({ name: "dashboard" }, { replace: true });
	}
};
const loginWithGoogle = async () => {
	const config = useRuntimeConfig();
	const baseUrl = config.public.frontendBaseUrl;
	await supabaseClient.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${baseUrl}/confirm` } });
};
const gotoForgotPassword = () => navigateTo({ name: "forgot-password" });
const gotoSignup = () => (mode === "login" ? navigateTo({ name: "register" }) : navigateTo({ name: "index" }));
</script>

<template>
	<div class="authentication-form flex flex-column">
		<div class="authentication-form__header flex flex-column">
			<h4 class="authentication-form__title heading-xl primary-text">{{ mode === "login" ? "Log in" : "Sign up" }}</h4>
			<p class="authentication-form__description body-l primary-text">Enter your credentials to {{ mode === "login" ? "access" : "create" }} your account.</p>
		</div>
		<div class="authentication-form__google">
			<button type="button" class="flex items-center content-center border-xs primary-text body-l" @click="loginWithGoogle">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google">
					<path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
					<path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
					<path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
					<path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
				</svg>
				{{ mode === "login" ? "Log in" : "Sign up" }} with Google
			</button>
		</div>
		<span class="or-text body-l">or</span>
		<div class="authentication-form__body">
			<form class="authentication-form__form flex flex-column" @submit.prevent="loginOrSignup">
				<BaseInput v-model.trim="formData.email" id="email" label="Email Address" placeholder="name@company.com" :is-required="true" />
				<BaseInput v-model.trim="formData.password" id="password" label="Password" placeholder="name12345" type="password" :is-required="true">
					<template v-if="mode === 'login'" #label><span class="primary-color-text cursor-pointer" @click="gotoForgotPassword">Forgot password?</span></template>
				</BaseInput>
				<BaseCheckbox v-if="mode === 'login'" v-model="formData.remember" id="remember" name="remember" label="Remember information" :has-background="false" />
				<BaseButton radius="small" :is-loading="isLoading" :disabled="!formData.email || !formData.password">{{ mode === "login" ? "Log in" : "Sign up" }}</BaseButton>
			</form>
		</div>
		<div class="authentication-form__footer">
			<p class="body-m medium-grey-text">
				{{ mode === "login" ? "Not a member?" : "Already a member?" }}
				<span class="primary-color-text cursor-pointer" @click="gotoSignup">{{ mode === "login" ? "Sign up" : "Log in" }}</span>
			</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.authentication-form {
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
