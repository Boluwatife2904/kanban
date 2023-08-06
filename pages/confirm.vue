<script setup lang="ts">
const { fetchBoards } = useBoardStore();
const user = useSupabaseUser();
const showAlert = ref(true);

watchEffect(async () => {
	if (user.value) {
		await fetchBoards();
		if (showAlert.value) useEvent("notify", { type: "success", message: "Signed in successfully. Welcome back!" });
		showAlert.value = false;
		return navigateTo({ name: "dashboard" }, { replace: true });
	}
});
</script>

<template>
	<div class="post-auth flex items-center content-center flex-column text-center">
		<span class="loader"></span>
		<h3 class="primary-text header-xl">Please do not refresh the page &nbsp; 🙏🏽</h3>
	</div>
</template>

<style scoped>
.post-auth {
	height: 100vh;
	width: 100%;
	background-color: var(--body-background);
	gap: 4rem;
	padding: 10%;
}

.loader {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: var(--loader-primary);
	box-shadow: 32px 0 var(--loader-primary), -32px 0 var(--loader-primary);
	position: relative;
	animation: flash 0.5s ease-out infinite alternate;
}

@keyframes flash {
	0% {
		background-color: var(--loader-secondary);
		box-shadow: 32px 0 var(--loader-secondary), -32px 0 var(--loader-primary);
	}
	50% {
		background-color: var(--loader-primary);
		box-shadow: 32px 0 var(--loader-secondary), -32px 0 var(--loader-secondary);
	}
	100% {
		background-color: var(--loader-secondary);
		box-shadow: 32px 0 var(--loader-primary), -32px 0 var(--loader-secondary);
	}
}
</style>
