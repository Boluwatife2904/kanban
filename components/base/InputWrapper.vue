<script setup lang="ts">
interface Props {
	label?: string;
}
defineProps<Props>();
</script>

<template>
	<div class="input-wrapper">
		<span class="block input-wrapper__label body-m">{{ label }}</span>
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped>
.input-wrapper {
	&__label {
		margin-bottom: 0.8rem;
		color: var(--label-color);
	}
}
</style>
