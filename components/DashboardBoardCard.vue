<script setup lang="ts">
import type { TaskWithSubtasks } from "@/types";

interface Props {
	task: TaskWithSubtasks;
}

interface Emits {
	(event: "show-task"): void;
}

defineEmits<Emits>();
const props = defineProps<Props>();

const numberOfCompletedTasks = computed(() => props.task.subtasks.filter((task) => task.isCompleted).length);
</script>

<template>
	<div class="board-card flex flex-column" @click="$emit('show-task')">
		<h5 class="board-card__title heading-m">{{ task.title }}</h5>
		<p class="medium-grey-text body-m">{{ numberOfCompletedTasks }} of {{ task.subtasks.length }} subtasks</p>
	</div>
</template>

<style lang="scss" scoped>
.board-card {
	border-radius: 0.8rem;
	background: var(--sidebar-background);
	box-shadow: 0rem 0.4rem 6px 0px rgba(54, 78, 126, 0.1);
	padding: 2.3rem 1.6rem;
	gap: 0.8rem;
	cursor: pointer;

	&__title {
		color: var(--primary-text);

		&:hover {
			color: var(--primary-color);
		}
	}
}
</style>
