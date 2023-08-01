<script setup lang="ts">
definePageMeta({
	layout: "dashboard",
});
const user = useSupabaseUser();
const authClient = useSupabaseAuthClient();

const logout = async () => {
	await authClient.auth.signOut();
	useEvent("notify", { type: "success", message: "You have been logged out successfully" });
	navigateTo({ name: "index" }, { replace: true });
};
</script>

<template>
	<div>
		<pre>{{ user }}</pre>

		<button @click="logout">Logout</button>
	</div>
</template>

<style lang="scss" scoped></style>
