<script setup lang="ts">
interface Props {
	variant: string;
}

defineProps<Props>();
</script>

<template>
	<svg v-if="variant === 'down'" width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M0.79834 1.54858L5.49682 6.24707L10.1953 1.54858" stroke="#635FC7" stroke-width="2" />
	</svg>
</template>

<style scoped></style>
