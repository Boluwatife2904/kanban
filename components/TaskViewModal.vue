<script setup lang="ts">
import type { Task, ItemToDelete, Option } from "@/types";

interface Props {
	show: boolean;
	view: string;
	task: Task | null;
	options: Option[];
}

interface Emits {
	(event: "close-modal"): void;
	(event: "edit-task"): void;
	(event: "delete-task", item: ItemToDelete): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const showTaskOptions = ref(false);
const todoStatus = props.options.find((option) => option.value === props.task?.status)?.content;
// const numberOfCompletedTasks = computed(() => props.task?.subtasks.filter((task) => task.isCompleted).length);
const numberOfCompletedTasks = 0;

const editTask = () => {
	if (props.task) emits("edit-task");
};
const deleteTask = () => {
	if (props.task) emits("delete-task", { name: props.task.title, id: props.task.id, type: "task", });
};
</script>

<template>
	<LazyBaseModal :show="show" @close-modal="$emit('close-modal')">
		<template v-if="task" #content>
			<div class="single-task flex flex-column">
				<div class="single-task__header flex items-center content-space-between">
					<h4 class="single-task__title heading-l primary-text">{{ task.title }}</h4>
					<div class="single-task__options position-relative">
						<DropdownToggler @click="showTaskOptions = !showTaskOptions" />
						<DropdownList :show="showTaskOptions" width="19.2rem" top="4rem" left="-9rem" gap="1.6rem" @outside-clicked="showTaskOptions = false">
							<DropdownListItem @click.stop="editTask">Edit Task</DropdownListItem>
							<DropdownListItem :is-delete="true" @click.stop="deleteTask">Delete Task</DropdownListItem>
						</DropdownList>
					</div>
				</div>
				<p v-if="task.description" class="single-task__description body-l medium-grey-text">{{ task.description }}</p>
				<div class="single-task__subtasks flex flex-column">
					<!-- <p class="single-task__subtasks__title medium-grey-text body-m">Subtasks ({{ numberOfCompletedTasks }} of {{ task.subtasks.length }})</p> -->
					<div class="single-task__subtasks__list flex flex-column">
						<!-- <BaseCheckbox v-for="subtask in task.subtasks" :key="subtask.title" v-model="subtask.isCompleted" :id="subtask.title" :name="subtask.title" :label="subtask.title" /> -->
					</div>
				</div>
				<BaseInputWrapper label="Current Status">
					<span class="body-m primary-text">{{ todoStatus }}</span>
				</BaseInputWrapper>
			</div>
		</template>
	</LazyBaseModal>
</template>

<style lang="scss" scoped>
.single-task {
	gap: 2.4rem;

	&__subtasks {
		&__title {
			margin-bottom: 1.6rem;
		}

		&__list {
			gap: 0.8rem;
		}
	}

	&__header {
		gap: 2.4rem;
	}
}
</style>
