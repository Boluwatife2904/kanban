<script setup lang="ts">
definePageMeta({
	layout: "auth",
	middleware: "guest",
});
</script>

<template>
	<AuthenticationForm mode="login" />
</template>
