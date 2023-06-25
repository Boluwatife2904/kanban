<script setup lang="ts">
import kanban from "@/data/kanban.json";
import type { Task } from "@/types";

definePageMeta({
	layout: "dashboard",
});

const route = useRoute();
const routeId = route.params.id as string;

const boardsMap: { [key: string]: string } = {
	"1": "Platform Launch",
	"2": "Marketing Plan",
	"3": "Roadmap",
};

const selectedBoard = kanban.boards.find((board) => board.name === boardsMap[routeId]);
const selectedTask = ref<Task | null>(null);
const showTaskModal = ref(false);
const taskModalView = ref("");

const openTaskModal = (showModal: boolean, viewType: string) => {
	showTaskModal.value = showModal;
	taskModalView.value = viewType;
};

const showSingleTask = (columnName: string, taskTitle: string) => {
	const selectedColumn = selectedBoard?.columns.find((column) => column.name === columnName);
	if (selectedColumn) {
		const task = selectedColumn.tasks.find((task) => task.title === taskTitle);
		if (task) {
			selectedTask.value = task;
			openTaskModal(true, "view");
		}
	}
};
</script>

<template>
	<div class="single-board">
		<div class="single-board__header flex items-center content-space-between">
			<div class="single-board__header--left">
				<p class="single-board__header__title heading-xl primary-text">
					{{ selectedBoard?.name }}
				</p>
			</div>
			<div class="single-board__header--right flex items-center">
				<BaseButton class="single-board__header__button" size="large" @click="openTaskModal(true, 'add')">
					<span class="hide-on-mobile">+ &nbsp; Add new task</span>
					<span class="hide-on-desktop"><IconsPlus /></span>
				</BaseButton>
				<button><IconsEllipsis /></button>
			</div>
		</div>
		<div class="single-board__body" :class="{ 'flex items-center content-center': selectedBoard?.columns.length === 0 }">
			<div v-if="selectedBoard && selectedBoard.columns.length > 0" class="single-board__content flex">
				<section class="single-board__column" v-for="column in selectedBoard.columns" :key="column.name">
					<h6 class="medium-grey-text heading-s text-uppercase single-board__column__name">{{ column.name }} ({{ column.tasks.length }})</h6>
					<div class="single-board__tasks flex flex-column">
						<DashboardBoardCard v-for="task in column.tasks" :key="task.title" :task="task" @show-task="showSingleTask(column.name, task.title)" />
					</div>
				</section>
			</div>
			<LazyTheEmptyState v-else />
		</div>
	</div>

	<TaskModal v-if="showTaskModal" :show="showTaskModal" :task="selectedTask" :view="taskModalView" @close-modal="openTaskModal(false, '')" />
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

		&--right {
			gap: 1.6rem;

			@media screen and (min-width: 768px) {
				gap: 2.4rem;
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
		padding: 2.4rem 0 5rem 2.4rem;
	}

	&__content {
		gap: 2.4rem;
        overflow-y: scroll;
	}

	&__column {
		flex: 1 1 28rem;
		width: 100%;
		max-width: 28rem;
        flex-shrink: 0;

		&__name {
			margin-bottom: 2.4rem;
		}
	}

	&__tasks {
		gap: 2rem;
	}
}
</style>
