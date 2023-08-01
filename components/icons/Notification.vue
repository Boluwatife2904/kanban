<script setup lang="ts">
interface Props {
	variant: string;
}

defineProps<Props>();
</script>

<template>
	<!-- ERROR ICON -->
	<svg v-if="variant === 'error'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
		<path fill="none" d="M0 0h24v24H0z" />
		<path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" fill="rgba(235,111,99,1)" />
	</svg>

	<!-- TOAST ICON -->
	<svg v-else-if="variant === 'success'" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
		<g fill="none" fill-rule="evenodd" stroke="rgb(76, 175, 80)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
			<path d="M21 10.07V11a10 10 0 1 1-5.93-9.14" />
			<path d="M22 2 11 13l-3-3" />
		</g>
	</svg>
</template>

<style scoped></style>
