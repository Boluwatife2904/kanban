<script setup lang="ts">
const { selectedTheme } = useTheme();

definePageMeta({
	layout: "auth",
});

const changeUserPassword = () => {};
</script>

<template>
	<div class="change-password flex flex-column">
		<div class="change-password__header flex flex-column">
			<h4 class="change-password__title heading-xl primary-text">Change password</h4>
			<p class="change-password__description body-l primary-text">Set a new password to regain access to your account.</p>
		</div>
		<div class="change-password__body">
			<form class="change-password__form flex flex-column" @submit.prevent="changeUserPassword">
				<BaseInput id="password" label="Enter New Password" placeholder="Enter new password" />
				<BaseInput id="password" label="Confirm New Password" placeholder="Confirm new password" />
				<BaseButton radius="small">Update password</BaseButton>
			</form>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.change-password {
	gap: 3rem;

	&__header {
		gap: 0.5rem;
	}

	&__form {
		gap: 3rem;
	}
}
</style>
