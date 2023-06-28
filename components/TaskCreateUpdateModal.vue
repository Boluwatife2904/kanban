<script setup lang="ts">
import type { Task } from "@/types";

interface Props {
	show: boolean;
	view: string;
	task?: Task | null;
}

interface Emits {
	(event: "close-modal"): void;
}

defineEmits<Emits>();
const props = defineProps<Props>();

const options = [
	{ value: "Todo", content: "Todo" },
	{ value: "Doing", content: "Doing" },
	{ value: "Progress", content: "Progress" },
	{ value: "Done", content: "Done" },
];

const newTask: Task = reactive({
	title: "",
	description: "",
	status: "",
	subtasks: [
		{ title: "", isCompleted: false },
		{ title: "", isCompleted: false },
	],
});

if (props.view === "edit" && props.task) {
	newTask.title = props.task.title;
	newTask.description = props.task.description;
	newTask.status = props.task.status;
	newTask.subtasks = props.task.subtasks;
	console.log(props.task);
}

const createOrUpdateTask = () => {};

const addNewSubtask = () => {
	newTask.subtasks.push({ title: "", isCompleted: false });
};

const removeSubtask = (taskTitle: string) => {
	newTask.subtasks = newTask.subtasks.filter((subtask) => subtask.title !== taskTitle);
};
</script>

<template>
	<LazyBaseModal :show="show" @close-modal="$emit('close-modal')">
		<template #content>
			<div class="task-form">
				<h5 class="task-form__title heading-l primary-text">{{ view === "add" ? "Add New" : "Edit" }} Task</h5>
				<form class="task-form__form flex flex-column" @submit.prevent="createOrUpdateTask">
					<BaseInput v-model="newTask.title" label="Title" placeholder="e.g. Take coffee break" />
					<BaseTextarea
						v-model="newTask.description"
						label="Description"
						placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
					/>
					<BaseInputWrapper label="Subtasks">
						<div class="task-form__subtasks flex flex-column">
							<div v-for="(subtask, index) in newTask.subtasks" :key="subtask.title" class="task-form__subtask flex items-center">
								<BaseInput v-model="subtask.title" :placeholder="index % 2 === 0 ? 'e.g. Make coffee' : 'e.g. Drink coffee & smile'" />
								<button @click="removeSubtask(subtask.title)"><IconsClose /></button>
							</div>
							<BaseButton type="button" variant="secondary" @click="addNewSubtask">+ Add New Subtask</BaseButton>
						</div>
					</BaseInputWrapper>
					<BaseDropdown v-model="newTask.status" label="Status" :options="options" />
					<BaseButton>{{ view === "add" ? "Create Task" : "Save Changes" }}</BaseButton>
				</form>
			</div>
		</template>
	</LazyBaseModal>
</template>

<style lang="scss" scoped>
.task-form {
	&__title {
		margin-bottom: 2.4rem;
	}

	&__form {
		gap: 2.4rem;
	}

	&__subtasks {
		gap: 1.2rem;
	}

	&__subtask {
		gap: 1.6rem;

		button {
			color: var(--medium-grey-text);

			&:hover {
				color: var(--destructive-color);
			}
		}
	}
}
</style>
