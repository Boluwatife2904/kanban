<script setup lang="ts">
interface Emits {
    (event: 'add-column'): void
}

defineEmits<Emits>()
</script>

<template>
	<div class="empty-state flex flex-column items-center content-center">
		<p class="empty-state__paragraph heading-l medium-grey-text text-center">This board is empty. Create a new column to get started.</p>
		<BaseButton @click="$emit('add-column')">+ Add New Column</BaseButton>
	</div>
</template>

<style lang="scss" scoped>
.empty-state {
	gap: 3.2rem;
	margin: auto;
}
</style>
