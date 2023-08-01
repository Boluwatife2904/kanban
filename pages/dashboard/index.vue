<script setup lang="ts">
definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});
const user = useSupabaseUser();
const authClient = useSupabaseAuthClient();

const logout = () => {
	authClient.auth.signOut().then(() => {
		useEvent("notify", { type: "success", message: "You have been logged out successfully" });
		navigateTo({ name: "index" }, { replace: true });
	});
};
</script>

<template>
	<div>
		<pre class="primary-text">{{ user }}</pre>

		<BaseButton @click="logout">Logout</BaseButton>
	</div>
</template>

<style lang="scss" scoped></style>
