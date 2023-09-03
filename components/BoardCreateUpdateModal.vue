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
	(event: "refresh-board"): void;
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
const idOfColumnToDelete = ref("");
const columnsToBeDeleted = ref<string[]>([]);
const haveNotMadeChanges = computed(() => {
	return props.view === "edit-board" && props.board?.title === boardData.title && JSON.stringify(columns.value) === JSON.stringify(props.board.columns.map(({ name, id }) => ({ name, id })));
});

if (props.view === "edit-board" && props.board) { // update form when updating board
	boardData.id = props.board.id;
	boardData.title = props.board.title;
	columns.value = props.board.columns.map(({ name, id }) => ({ name, id }));
}

const createOrUpdateBoard = async () => {
	if (boardData.title === "") {
		useEvent("notify", { type: "error", message: "Please fill the required fields" });
		return;
	}
	isLoading.value = true;
	const boardColumns = columns.value.map(({ name, id }) => ({ name, id, board_id: boardData.id, user_id: user.value?.id })).filter((column) => column.name);
	const { error: boardError } = await client.from("boards").upsert(boardData); // update board data in server
	if (columnsToBeDeleted.value.length > 0) await client.from("columns").delete().in("id", columnsToBeDeleted.value); // delete columns from server
	const { error: columnsError } = await client.from("columns").upsert(boardColumns); // update columns in server
	if (boardError || columnsError) {
		isLoading.value = false;
		useEvent("notify", { type: "error", message: `An error occurred trying to ${props.view === "edit-board" ? "update" : "create"} this board. Please try again.` });
		return;
	}
	if (props.view === "add-board") {
		addBoard(boardData);
		useEvent("notify", { type: "success", message: "New board created successfully." });
	} else if (props.view === "edit-board") {
		emits("refresh-board");
		useEvent("notify", { type: "success", message: "Board updated successfully." });
	}
	isLoading.value = false;
	emits("close-modal");
};

const addNewColumn = () => columns.value.push({ name: "", id: uuidv4() });
const removeColumn = (columnId: string) => {
	const columnExists = props.board?.columns.some((column) => column.id === columnId);
	columnExists ? (idOfColumnToDelete.value = columnId) : (columns.value = columns.value.filter((column) => column.id !== columnId));
};

const confirmColumnDeletion = () => {
	columnsToBeDeleted.value.push(idOfColumnToDelete.value);
	columns.value = columns.value.filter((column) => column.id !== idOfColumnToDelete.value);
	idOfColumnToDelete.value = "";
};
</script>

<template>
	<LazyBaseModal :show="show" @close-modal="$emit('close-modal')">
		<template #content>
			<div class="position-relative">
				<div class="board-form">
					<h5 class="board-form__title heading-l primary-text">{{ view === "add-board" ? "Add New" : "Edit" }} Board</h5>
					<form class="board-form__form flex flex-column" @submit.prevent="createOrUpdateBoard">
						<BaseInput v-model="boardData.title" label="Title" placeholder="e.g. Take coffee break" :is-required="true" />
						<BaseInputWrapper label="Columns">
							<div class="board-form__columns flex flex-column">
								<div v-for="(item, index) in columns" :key="item.id" class="board-form__column flex items-center">
									<BaseInput v-model="item.name" type="text" :id="item.name" :placeholder="index % 2 === 0 ? 'e.g. Todo' : 'e.g. Doing'" />
									<button :disabled="columns.length === 1 && index === 0" type="button" @click="removeColumn(item.id)"><IconsClose /></button>
								</div>
								<BaseButton type="button" variant="secondary" @click="addNewColumn">+ Add New column</BaseButton>
							</div>
						</BaseInputWrapper>
						<BaseButton :is-loading="isLoading" :disabled="haveNotMadeChanges || boardData.title === ''">{{ view === "add-board" ? "Create New Board" : "Save Changes" }}</BaseButton>
					</form>
				</div>
				<div v-if="!!idOfColumnToDelete" class="confirmation flex flex-column position-absolute border-s">
					<h4 class="confirmation__title heading-l destructive-text">Delete this column?</h4>
					<p class="confirmation__message body-l medium-grey-text">Are you sure you want to delete this column? This action will remove all tasks belonging to this column and this action cannot be reversed once you save changes.</p>
					<div class="confirmation__actions grid">
						<BaseButton variant="destructive" size="large" @click="confirmColumnDeletion">Delete</BaseButton>
						<BaseButton variant="secondary" size="large" @click="idOfColumnToDelete = ''">Cancel</BaseButton>
					</div>
				</div>
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

.confirmation {
	background-color: var(--body-background);
	top: -3.2rem;
	left: -3.2rem;
	height: calc(100% + 6.4rem);
	width: calc(100% + 6.4rem);
	padding: 3.2rem;
	gap: 2.4rem;

	&__actions {
		gap: 1.6rem;
		margin-top: auto;

		@media screen and (min-width: 600px) {
			grid-template-columns: repeat(2, 1fr);
		}
	}
}
</style>
