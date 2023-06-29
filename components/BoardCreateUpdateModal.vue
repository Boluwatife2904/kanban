<script setup lang="ts">
import type { BoardItem } from "@/types";

interface Props {
	show: boolean;
	view: string;
	board?: BoardItem | null;
}

interface Emits {
	(event: "close-modal"): void;
}

defineEmits<Emits>();
const props = defineProps<Props>();

const newBoard: BoardItem = reactive({
	name: "",
	columns: [{ name: "" }, { name: "" }],
});

if (props.view === "edit-board" && props.board) {
	newBoard.name = props.board.name;
	newBoard.columns = props.board.columns.map(({ name }) => {
		return { name };
	});
}

const createOrUpdateBoard = () => {
	console.log("Something something dey happen >>>>>>>>");
};

const addNewColumn = () => {
	newBoard.columns.push({ name: "" });
};

const removeColumn = (columnTitle: string) => {
	newBoard.columns = newBoard.columns.filter((column) => column.name !== columnTitle);
};
</script>

<template>
	<LazyBaseModal :show="show" @close-modal="$emit('close-modal')">
		<template #content>
			<div class="board-form">
				<h5 class="board-form__title heading-l primary-text">{{ view === "add-board" ? "Add New" : "Edit" }} Board</h5>
				<form class="board-form__form flex flex-column" @submit.prevent="createOrUpdateBoard">
					<BaseInput v-model="newBoard.name" label="Title" placeholder="e.g. Take coffee break" />
					<BaseInputWrapper label="Columns">
						<div class="board-form__columns flex flex-column">
							<div v-for="(item, index) in newBoard.columns" :key="index" class="board-form__column flex items-center">
								<BaseInput v-model="item.name" type="text" :id="item.name" :placeholder="index % 2 === 0 ? 'e.g. Todo' : 'e.g. Doing'" />
								<button type="button" @click="removeColumn(item.name)"><IconsClose /></button>
							</div>
							<BaseButton type="button" variant="secondary" @click="addNewColumn">+ Add New column</BaseButton>
						</div>
					</BaseInputWrapper>
					<BaseButton>{{ view === "add-board" ? "Create New Board" : "Save Changes" }}</BaseButton>
				</form>
			</div>
		</template>
	</LazyBaseModal>
</template>

<style lang="scss" scoped>
.board-form {
	&__title {
		margin-bottom: 2.4rem;
	}

	&__form {
		gap: 2.4rem;
	}

	&__columns {
		gap: 1.2rem;
	}

	&__column {
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
