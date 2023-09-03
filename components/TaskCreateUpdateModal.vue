<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import type { Task, TaskWithSubtasks, Option } from "@/types";

interface Props {
	show: boolean;
	view: string;
	task?: TaskWithSubtasks | null;
	options: Option[];
	boardId: string;
}

interface Emits {
	(event: "close-modal"): void;
	(event: "add-task", data: TaskWithSubtasks): void;
	(event: "edit-task", data: TaskWithSubtasks): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const client = useSupabaseClient();
const user = useSupabaseUser();
const user_id = user.value?.id as string;

const newTask: Task = reactive({ id: uuidv4(), title: "", description: "", status: "", user_id, board_id: props.boardId, order: 0 });
const subtasks = ref([
	{ id: uuidv4(), title: "", isCompleted: false },
	{ id: uuidv4(), title: "", isCompleted: false },
]);
const subtasksToBeDeleted = ref<string[]>([]);
if (props.view === "edit-task" && props.task) {
	newTask.title = props.task.title;
	newTask.description = props.task.description;
	newTask.status = props.task.status;
	newTask.id = props.task.id;
	subtasks.value = props.task.subtasks.map(({ id, title, isCompleted }) => ({ id, title, isCompleted }));
}
const isLoading = ref(false);

const createOrUpdateTask = async () => {
	if (newTask.status === "" || newTask.title === "") {
		useEvent("notify", { type: "error", message: "Please fill the required fields" });
		return;
	}
	isLoading.value = true;
	const mappedSubtasks = subtasks.value
		.map(({ id, title, isCompleted }) => {
			return { id, title, isCompleted, user_id, board_id: props.boardId, column_id: newTask.status, task_id: newTask.id };
		})
		.filter(({ title }) => !!title);
	const selectedColumnCount = props.options.find((option) => option.value === newTask.status)?.count ?? 0;
	const { error: taskError } = await client.from("tasks").upsert({ ...newTask, order: selectedColumnCount + 1 });
	if (subtasksToBeDeleted.value.length > 0) {
		await client.from("subtasks").delete().in("id", subtasksToBeDeleted.value);
	}
	const { error: subtasksError } = await client.from("subtasks").upsert(mappedSubtasks);
	if (taskError || subtasksError) {
		isLoading.value = false;
		useEvent("notify", { type: "error", message: `An error occurred trying to ${props.view === "add-task" ? "create" : "update"} the task. Please try again.` });
		return;
	}
	props.view === "edit-task" ? emits("edit-task", { ...newTask, subtasks: mappedSubtasks }) : emits("add-task", { ...newTask, subtasks: mappedSubtasks });
	useEvent("notify", { type: "success", message: `${props.view === "add-task" ? "New task created" : "Task updated"} successfully.` });
	isLoading.value = false;
	emits("close-modal");
};

const addNewSubtask = () => {
	subtasks.value.push({ id: uuidv4(), title: "", isCompleted: false });
};

const removeSubtask = (subtaskId: string) => {
	if (props.task) {
		const subtaskIndex = props.task.subtasks.findIndex((subtask) => subtask.id === subtaskId);
		if (subtaskIndex > -1) subtasksToBeDeleted.value.push(subtaskId);
	}
	subtasks.value = subtasks.value.filter((subtask) => subtask.id !== subtaskId);
};
</script>

<template>
	<LazyBaseModal :show="show" @close-modal="$emit('close-modal')">
		<template #content>
			<div class="task-form">
				<h5 class="task-form__title heading-l primary-text">{{ view === "add-task" ? "Add New" : "Edit" }} Task</h5>
				<form class="task-form__form flex flex-column" @submit.prevent="createOrUpdateTask">
					<BaseInput v-model="newTask.title" label="Title" placeholder="e.g. Take coffee break" :is-required="true" />
					<BaseTextarea
						v-model="newTask.description"
						label="Description"
						placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little." />
					<BaseInputWrapper label="Subtasks">
						<div class="task-form__subtasks flex flex-column">
							<div v-for="(subtask, index) in subtasks" :key="subtask.id" class="task-form__subtask flex items-center">
								<BaseInput v-model="subtask.title" :placeholder="index % 2 === 0 ? 'e.g. Make coffee' : 'e.g. Drink coffee & smile'" />
								<button type="button" :disabled="subtasks.length === 1 && index === 0" @click="removeSubtask(subtask.id)"><IconsClose /></button>
							</div>
							<BaseButton type="button" variant="secondary" @click="addNewSubtask">+ Add New Subtask</BaseButton>
						</div>
					</BaseInputWrapper>
					<BaseDropdown v-model="newTask.status" label="Status" :options="options" />
					<BaseButton :is-loading="isLoading">{{ view === "add-task" ? "Create Task" : "Save Changes" }}</BaseButton>
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
