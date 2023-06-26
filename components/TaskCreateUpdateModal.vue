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

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const showTaskModal = ref(props.show);
const options = [
	{ value: "Todo", content: "Todo" },
	{ value: "Doing", content: "Doing" },
	{ value: "Progress", content: "Progress" },
	{ value: "Done", content: "Done" },
];
const subtasks = ref([
	{ id: 1, title: "", isCompleted: false },
	{ id: 2, title: "", isCompleted: false },
]);
const newTask = reactive({
	title: "",
	description: "",
	status: "",
	subtasks: [
		{ id: 1, title: "", isCompleted: false },
		{ id: 2, title: "", isCompleted: false },
	],
});

const closeModal = () => {
	showTaskModal.value = false;
	setTimeout(() => {
		emits("close-modal");
	}, 1);
};

const createOrUpdateTask = () => {};

const addNewSubtask = () => {
	newTask.subtasks.push({ id: newTask.subtasks.length + 1, title: "", isCompleted: false });
};

const removeSubtask = (taskId: number) => {
	newTask.subtasks = newTask.subtasks.filter((subtask) => subtask.id !== taskId);
};
</script>

<template>
	<BaseModal :show="showTaskModal" @close-modal="closeModal">
		<template #content>
			<div class="task-form">
				<h5 class="task-form__title heading-l primary-text">Add New Task</h5>
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
							<div v-for="(subtask, index) in newTask.subtasks" :key="subtask.id" class="task-form__subtask flex items-center">
								<BaseInput v-model="subtask.title" :placeholder="index % 2 === 0 ? 'e.g. Make coffee' : 'e.g. Drink coffee & smile'" />
								<button @click="removeSubtask(subtask.id)"><IconsClose /></button>
							</div>
							<BaseButton type="button" variant="secondary" @click="addNewSubtask">+ Add New Subtask</BaseButton>
						</div>
					</BaseInputWrapper>
					<BaseDropdown v-model="newTask.status" label="Status" :options="options" />
					<BaseButton>{{ view === "add" ? "Create Task" : "Save Changes" }}</BaseButton>
				</form>
			</div>
		</template>
	</BaseModal>
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
