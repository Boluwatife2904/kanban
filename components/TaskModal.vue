<script setup lang="ts">
import type { Task } from "@/types";

interface Props {
	show: boolean;
	view: string;
	task: Task | null;
}

interface Emits {
	(event: "close-modal"): void;
}

const emits = defineEmits<Emits>();

const props = defineProps<Props>();

const showTaskModal = ref(props.show);
const currentModalView = ref(props.view);
const showTaskOptions = ref(false);
const options = [
	{ value: "Todo", content: "Todo" },
	{ value: "Doing", content: "Doing" },
	{ value: "Progress", content: "Progress" },
	{ value: "Done", content: "Done" },
];
const numberOfCompletedTasks = computed(() => props.task?.subtasks.filter((task) => task.isCompleted).length);

const closeModal = () => {
	showTaskModal.value = false;
	setTimeout(() => {
		emits("close-modal");
	}, 1);
};

const editTask = () => {
	console.log("Is Editing Task");
};
const deleteTask = () => {
	console.log("Id Deleting Task");
};
</script>

<template>
	<BaseModal :show="showTaskModal" @close-modal="closeModal">
		<template #content>
			<template v-if="currentModalView === 'view' && task">
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
						<p class="single-task__subtasks__title medium-grey-text body-m">Subtasks ({{ numberOfCompletedTasks }} of {{ task.subtasks.length }})</p>
						<div class="single-task__subtasks__list flex flex-column">
							<BaseCheckbox v-for="subtask in task.subtasks" :key="subtask.title" v-model="subtask.isCompleted" :id="subtask.title" :name="subtask.title" :label="subtask.title" />
						</div>
					</div>
					<div class="single-task__status">
						<BaseDropdown :options="options" v-model="task.status" label="Current Status" />
					</div>
				</div>
			</template>
			<template v-else-if="currentModalView === 'edit' || currentModalView === 'add'">
				{{ view }}
			</template>
		</template>
	</BaseModal>
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
