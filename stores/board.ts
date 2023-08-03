import type { BoardItem } from "@/types";

export const useBoardStore = defineStore("board", () => {
	const client = useSupabaseClient();
	const boards = ref<BoardItem[]>([]);
	const user = useSupabaseUser();

	const fetchBoards = async () => {
		const { data, error } = await useAsyncData("boards-data", async () => {
			const { data } = await client.from("boards").select("*").eq("user_id", user.value?.id).order("created_at");
			return data as unknown as BoardItem[];
		});
		if (data.value) boards.value = data.value;

		return { data, error }
	};

	const setBoards = (data: BoardItem[]) => {
		boards.value = data;
	};

	const addBoard = (board: BoardItem) => {
		boards.value.unshift(board);
	};

	const deleteBoard = (boardId: string) => {
		boards.value = boards.value.filter((board) => board.id !== boardId);
	};

	const updateBoardName = (boardId: string, boardTitle: string) => {
		boards.value = boards.value.map((board) => {
			if (board.id === boardId) return { ...board, title: boardTitle };
			return board;
		});
	};

	return { boards, fetchBoards, addBoard, deleteBoard, setBoards, updateBoardName };
});
