<script setup lang="ts">
import type { ItemToDelete } from "~/types";

interface Props {
	show: boolean;
	itemToDelete: ItemToDelete;
}

interface Emits {
	(event: "confirm-action"): void;
	(event: "cancel-action"): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const client = useSupabaseClient();
const isLoading = ref(false);

const deleteMessage = computed(() => {
	if (props.itemToDelete.type === "board") return `Are you sure you want to delete the '${props.itemToDelete.name}' board? This action will remove all columns and tasks and cannot be reversed.`;
	return `Are you sure you want to delete the '${props.itemToDelete.name}' task and its subtasks? This action cannot be reversed.`;
});

const confirmActionDeletion = async () => {
	isLoading.value = true;
	const { error } = await client.from(`${props.itemToDelete.type}s`).delete().eq("id", props.itemToDelete.id);
	if (error) {
		isLoading.value = false;
		useEvent("notify", { type: "error", message: `An occurred trying to delete this ${props.itemToDelete.type}` });
		return;
	}
	isLoading.value = false;
	emits("confirm-action");
};
</script>

<template>
	<LazyBaseModal :show="show" @close-modal="$emit('cancel-action')">
		<template #header>
			<span class="heading-l destructive-text">Delete this {{ itemToDelete.type }}?</span>
		</template>
		<template #content>
			<p class="body-l medium-grey-text">{{ deleteMessage }}</p>
			<div class="delete-actions grid">
				<BaseButton variant="destructive" size="large" :is-loading="isLoading" @click="confirmActionDeletion"> Delete </BaseButton>
				<BaseButton variant="secondary" size="large" @click="$emit('cancel-action')"> Cancel </BaseButton>
			</div>
		</template>
	</LazyBaseModal>
</template>

<style lang="scss" scoped>
.delete-actions {
	gap: 1.6rem;
	margin-top: 2.4rem;

	@media screen and (min-width: 600px) {
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>
