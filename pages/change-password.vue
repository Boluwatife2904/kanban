<script setup lang="ts">
definePageMeta({
	layout: "auth",
});

const client = useSupabaseClient();
const form = reactive({ password: "", confirmPassword: "" });

const changeUserPassword = async () => {
	if (form.password === "") {
		useEvent("notify", { type: "error", message: "You need to enter a passoword" });
		return;
	}
	if (form.password !== form.confirmPassword) {
		useEvent("notify", { type: "error", message: "Passwords do not match!!!" });
		return;
	}
	const { error } = await client.auth.updateUser({ password: form.password });
	if (error) {
		useEvent("notify", { type: "error", message: "There was error trying to update your password." });
		return;
	}
	navigateTo({ name: "index " }, { replace: true });
	useEvent("notify", { type: "error", message: "Your password have been updated successfully." });
};
</script>

<template>
	<div class="change-password flex flex-column">
		<div class="change-password__header flex flex-column">
			<h4 class="change-password__title heading-xl primary-text">Change password</h4>
			<p class="change-password__description body-l primary-text">Set a new password to regain access to your account.</p>
		</div>
		<div class="change-password__body">
			<form class="change-password__form flex flex-column" @submit.prevent="changeUserPassword">
				<BaseInput v-model.trim="form.password" id="password" type="password" label="Enter New Password" placeholder="Enter new password" />
				<BaseInput v-model.trim="form.confirmPassword" id="confirmPassword" type="password" label="Confirm New Password" placeholder="Confirm new password" />
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
