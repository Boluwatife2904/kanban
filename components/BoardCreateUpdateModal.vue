<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import type { Board } from "@/types";

interface Props {
	show: boolean;
	view: string;
	board?: Board | null;
}
interface Emits {
	(event: "close-modal"): void;
}
const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const client = useSupabaseClient();
const user = useSupabaseUser();
const { addBoard } = useBoardStore();

const boardData = reactive({ title: "", id: uuidv4(), user_id: user.value?.id });
const columns = ref([
	{ name: "", id: uuidv4() },
	{ name: "", id: uuidv4() },
]);
const isLoading = ref(false);

if (props.view === "edit-board" && props.board) {
	boardData.title = props.board.title;
	columns.value = props.board.columns.map(({ name, id }) => {
		return { name, id };
	});
}

const createOrUpdateBoard = async () => {
	if (props.view === "add-board") {
		isLoading.value = true;
		const newColumns = columns.value.map(({ name, id }) => {
			return { name, id, board_id: boardData.id, user_id: user.value?.id };
		});
		const { error: boardError } = await client.from("boards").insert(boardData);
		const { error: columnsError } = await client.from("columns").insert(newColumns);
		if (boardError || columnsError) {
			isLoading.value = false;
			useEvent("notify", { type: "error", message: "An error occurred trying to create the board. Please try again." });
			return;
		}
		addBoard(boardData);
		useEvent("notify", { type: "success", message: "New board created successfully." });
		isLoading.value = false;
		emits("close-modal");
	}
};

const addNewColumn = () => {
	columns.value.push({ name: "", id: uuidv4() });
};

const removeColumn = (columnId: string) => {
	columns.value = columns.value.filter((column) => column.id !== columnId);
};
</script>

<template>
	<LazyBaseModal :show="show" @close-modal="$emit('close-modal')">
		<template #content>
			<div class="board-form">
				<h5 class="board-form__title heading-l primary-text">{{ view === "add-board" ? "Add New" : "Edit" }} Board</h5>
				<form class="board-form__form flex flex-column" @submit.prevent="createOrUpdateBoard">
					<BaseInput v-model="boardData.title" label="Title" placeholder="e.g. Take coffee break" />
					<BaseInputWrapper label="Columns">
						<div class="board-form__columns flex flex-column">
							<div v-for="(item, index) in columns" :key="item.id" class="board-form__column flex items-center">
								<BaseInput v-model="item.name" type="text" :id="item.name" :placeholder="index % 2 === 0 ? 'e.g. Todo' : 'e.g. Doing'" />
								<button :disabled="columns.length === 1 && index === 0" type="button" @click="removeColumn(item.id)"><IconsClose /></button>
							</div>
							<BaseButton type="button" variant="secondary" @click="addNewColumn">+ Add New column</BaseButton>
						</div>
					</BaseInputWrapper>
					<BaseButton :is-loading="isLoading">{{ view === "add-board" ? "Create New Board" : "Save Changes" }}</BaseButton>
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

		span {
			min-width: 1.5rem;
		}
	}
}
</style>
