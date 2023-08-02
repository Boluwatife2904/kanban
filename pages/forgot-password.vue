<script setup lang="ts">
definePageMeta({
	layout: "auth",
	middleware: "guest",
});

const config = useRuntimeConfig();
const authClient = useSupabaseAuthClient();
const { selectedTheme } = useTheme();
const email = ref("");
const isLoading = ref(false);

const sendResetInstructions = async () => {
	const baseUrl = config.public.frontendBaseUrl;
	isLoading.value = true;
	const { error } = await authClient.auth.resetPasswordForEmail(email.value, { redirectTo: `${baseUrl}/change-password` });
	if (error) {
		isLoading.value = false;
		useEvent("notify", { type: "error", message: error.message });
		return;
	}
	useEvent("notify", { type: "success", message: "Password reset instructions have been sent to your email." });
	isLoading.value = false;
};

const goBackToLogin = () => navigateTo({ name: "index" });
</script>

<template>
	<div class="reset-form flex flex-column">
		<div class="reset-form__header flex flex-column">
			<h4 class="reset-form__title heading-xl primary-text">Forgot password?</h4>
			<p class="reset-form__description body-l primary-text">No worries, we'll send you reset instruction.</p>
		</div>
		<div class="reset-form__body">
			<form class="reset-form__form flex flex-column" @submit.prevent="sendResetInstructions">
				<BaseInput v-model="email" id="email" label="Email Address" placeholder="Enter your email" />
				<BaseButton radius="small" :is-loading="isLoading">Reset password</BaseButton>
				<span class="flex items-center cursor-pointer primary-text body-m back-button" @click="goBackToLogin">
					<svg :width="14" :height="14" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M17.8686 35C17.8686 30.4912 19.6735 26.1673 22.8862 22.9792C26.099 19.791 30.4565 18 35 18M35 18C32.7503 18 30.5226 17.5602 28.4441 16.7061C26.3656 15.8516 24.477 14.5993 22.8862 13.0208C21.2954 11.4421 20.0336 9.56804 19.1726 7.50554C18.3117 5.44304 17.8686 3.23242 17.8686 1M35 18H1"
							:stroke="selectedTheme === 'light-mode' ? 'black' : 'white'"
							stroke-width="3"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					Back to Login
				</span>
			</form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.reset-form {
	gap: 3rem;

	&__header {
		gap: 0.5rem;
	}

	&__form {
		gap: 3rem;
	}
}

.back-button {
	gap: 0.8rem;
	margin: 0 auto;

	svg {
		transform: rotate(-180deg);
	}
}
</style>
