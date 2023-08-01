export const useBoardStore = defineStore("board", () => {
	const boards = ref([]);

	const setBoards = (userBoards) => {
		boards.value = userBoards;
	};

	const addBoard = (board) => {
		boards.value.unshift(board);
	};

	const deleteBoard = (boardId) => {
		boards.value = boards.value.filter((board) => board.id !== boardId);
	};

	return { boards, setBoards, addBoard, deleteBoard };
});
