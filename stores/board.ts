export const useBoardStore = defineStore("board", () => {
	const client = useSupabaseClient();
	const boards = ref([]);
	const user = useSupabaseUser();

	const fetchBoards = async () => {
		const { data, error } = await useAsyncData("boards-data", async () => {
			const { data } = await client.from("boards").select("*").eq("user_id", user.value?.id).order("created_at");
			return data;
		});
		boards.value = data.value;
		// return data;
	};

	const setBoards = (data) => {
		boards.value = data;
	};

	const addBoard = (board) => {
		boards.value.unshift(board);
	};

	const deleteBoard = (boardId) => {
		boards.value = boards.value.filter((board) => board.id !== boardId);
	};

	const updateBoardName = (boardId, boardTitle) => {
		boards.value = boards.value.map((board) => {
			if (board.id === boardId) return { ...board, title: boardTitle };
			return board;
		});
	};

	return { boards, fetchBoards, addBoard, deleteBoard, setBoards };
});
