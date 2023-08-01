<script setup lang="ts"></script>

<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<Notifications />
		<NuxtLoadingIndicator color="#635fc7" :height="5" />
	</div>
</template>

<style scoped></style>
