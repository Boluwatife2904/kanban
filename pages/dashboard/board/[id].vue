<script setup lang="ts">
import type { Task, ItemToDelete, Board, TaskWithSubtasks } from "@/types";
import { useEvent } from "@/composables/useEventBus";

definePageMeta({
	layout: "dashboard",
	middleware: "auth",
});

const route = useRoute();
const routeId = route.params.id as string;
const client = useSupabaseClient();
const { deleteBoard } = useBoardStore();

const { data: board } = await useAsyncData("boards", async () => {
	const { data } = await client.from("boards").select("*, columns(*, tasks(*))").eq("id", routeId).order("created_at").single();
	return data as unknown as Board;
});

if (!board.value) {
	throw createError({ statusCode: 404, statusMessage: "Board Not Found" });
}

const selectedTask = ref<Task | null>(null);
const showBoardOptions = ref(false);
const activeModal = ref("");
const itemToDelete = reactive<ItemToDelete>({ id: "", type: "", name: "" });
const taskColumns = computed(() => {
	return board.value!.columns.map(({ id, name }: { id: string; name: string }) => ({ value: id, content: name }));
});

const setActiveModal = (modalType: string) => {
	activeModal.value = modalType;
};

const showSingleTask = (columnId: string, taskId: string) => {
	const selectedColumn = board.value?.columns.find((column) => column.id === columnId);
	if (selectedColumn) {
		const task = selectedColumn.tasks.find((task) => task.id === taskId);
		if (task) {
			selectedTask.value = task;
			setActiveModal("view-task");
		}
	}
};

const deleteBoardOrTask = ({ type, id, name }: ItemToDelete) => {
	itemToDelete.id = id;
	itemToDelete.type = type;
	itemToDelete.name = name;
	setActiveModal(`delete-${type}`);
};

const confirmDeletion = () => {
	setActiveModal("");
	if (itemToDelete.type === "board") {
		deleteBoard(itemToDelete.id);
		navigateTo({ name: "dashboard" }, { replace: true });
	} else if (itemToDelete.type === "task") {
		const taskColumn = board.value?.columns.find((column) => column.id === selectedTask.value?.status);
		if (taskColumn) {
			taskColumn.tasks = taskColumn?.tasks.filter((task) => task.id !== itemToDelete.id);
		}
	}
	useEvent("notify", { type: "success", message: `${capitalizeFirstLetter(itemToDelete.type)} have been successfully deleted!` });
};

const addNewTaskToColumn = (task: TaskWithSubtasks) => {
	const selectedColumnIndex = board.value?.columns.findIndex((column) => column.id === task.status) as number;
	board.value?.columns[selectedColumnIndex].tasks.push(task);
};
</script>

<template>
	<div v-if="board" class="single-board">
		<div class="single-board__header flex items-center content-space-between">
			<div class="single-board__header--left flex items-center">
				<TheLogo variant="mobile" />
				<p class="single-board__header__title heading-xl primary-text flex items-center" @click="useEvent('show-sidebar')">
					<span>{{ board.title }}</span>
					<IconsArrow variant="down" />
				</p>
			</div>
			<div class="single-board__header--right flex items-center">
				<BaseButton class="single-board__header__button" size="large" @click="setActiveModal('add-task')">
					<span class="hide-on-mobile">+ Add new task</span>
					<span class="hide-on-desktop"><IconsPlus /></span>
				</BaseButton>
				<div class="single-task__options position-relative">
					<DropdownToggler @click="showBoardOptions = !showBoardOptions" />
					<DropdownList :show="showBoardOptions" width="19.2rem" top="calc(100% + 2.2rem)" right="0rem" gap="1.6rem" @outside-clicked="showBoardOptions = false">
						<DropdownListItem @click.stop="setActiveModal('edit-board')">Edit Board</DropdownListItem>
						<DropdownListItem :is-delete="true" @click.stop="deleteBoardOrTask({ id: board.id, name: board.title, type: 'board' })">Delete Board</DropdownListItem>
					</DropdownList>
				</div>
			</div>
		</div>
		<div class="single-board__body" :class="{ 'flex items-center content-center': board?.columns.length === 0 }">
			<div v-if="board && board.columns.length > 0" class="single-board__content flex">
				<section class="single-board__column" v-for="column in board.columns" :key="column.id">
					<h6 class="medium-grey-text heading-s text-uppercase single-board__column__name flex items-center">
						<span class="single-board__column__color block border-rounded"></span>
						{{ column.name }} ({{ column.tasks.length }})
					</h6>
					<div v-if="column.tasks && column.tasks.length > 0" class="single-board__tasks flex flex-column">
						<DashboardBoardCard v-for="task in column.tasks" :key="task.title" :task="task" @show-task="showSingleTask(column.id, task.id)" />
					</div>
				</section>
				<button class="single-board__column single-board__column--add medium-grey-text heading-xl border-s" @click="setActiveModal('edit-board')">+ New Column</button>
			</div>
			<LazyTheEmptyState v-else @add-column="setActiveModal('edit-board')" />
		</div>
	</div>

	<TaskViewModal v-if="activeModal === 'view-task'" :show="activeModal === 'view-task'" :task="selectedTask" :view="activeModal" @delete-task="deleteBoardOrTask" :options="taskColumns" @edit-task="setActiveModal('edit-task')" @close-modal="setActiveModal('')" />
	<TaskCreateUpdateModal v-if="activeModal === 'add-task' || activeModal === 'edit-task'" :show="activeModal === 'add-task' || activeModal === 'edit-task'" :view="activeModal" :task="selectedTask" :options="taskColumns" :board-id="board?.id ?? ''" @add-task="addNewTaskToColumn" @close-modal="setActiveModal('')" />
	<BoardCreateUpdateModal v-if="activeModal === 'edit-board'" :show="activeModal === 'edit-board'" :view="activeModal" :board="board" @close-modal="setActiveModal('')" />
	<TheActionPrompt :show="activeModal === 'delete-task' || activeModal === 'delete-board'" :item-to-delete="itemToDelete" @confirm-action="confirmDeletion" @cancel-action="setActiveModal('')" />
</template>

<style lang="scss" scoped>
.single-board {
	&__header {
		background-color: var(--sidebar-background);
		padding: 2rem 3.2rem 2.8rem 2.4rem;
		border-bottom: 0.1rem solid var(--lines-color);
		position: sticky;
		top: 0;
		left: 0;
		gap: 2rem;

		&--left {
			gap: 1.8rem;

			svg {
				@media screen and (min-width: 768px) {
					display: none;
				}
			}
		}

		&--right {
			gap: 1.6rem;

			@media screen and (min-width: 768px) {
				gap: 2.4rem;
			}
		}

		&__title {
			cursor: pointer;
			gap: 0.8rem;

			span {
				display: -webkit-box;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			@media screen and (min-width: 768px) {
				cursor: default;
				pointer-events: none;
			}
		}

		&__button {
			padding: 1rem 1.8rem;

			@media screen and (min-width: 768px) {
				padding: 1.4rem 2.4rem;
			}
		}
	}

	&__body {
		min-height: calc(100vh - 10rem);
		overflow-y: scroll;
	}

	&__content {
		gap: 2.4rem;
		padding: 2.4rem 0 5rem 2.4rem;
	}

	&__column {
		flex: 1 1 28rem;
		width: 100%;
		max-width: 28rem;
		flex-shrink: 0;

		&:nth-child(1) {
			.single-board__column__color {
				background-color: #49c4e5;
			}
		}

		&:nth-child(2) {
			.single-board__column__color {
				background-color: #8471f2;
			}
		}

		&:nth-child(3) {
			.single-board__column__color {
				background-color: #67e2ae;
			}
		}

		&__color {
			height: 1.5rem;
			width: 1.5rem;
		}

		&__name {
			margin-bottom: 2.4rem;
			gap: 1.2rem;
		}

		&--add {
			min-height: calc(100vh - 10rem);
			margin-top: 3.9rem;
			background: var(--add-column-background);
		}
	}

	&__tasks {
		gap: 2rem;
	}
}
</style>
