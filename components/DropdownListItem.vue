<script setup lang="ts">
interface Props {
	isDelete?: boolean;
}

const { isDelete = false } = defineProps<Props>();
</script>

<template>
	<button type="button" class="dropdown__list-item body-l text-left" :class="isDelete ? 'destructive-text' : 'medium-grey-text'">
		<slot></slot>
	</button>
</template>

<style lang="scss" scoped>
.dropdown__list-item {
}
</style>
