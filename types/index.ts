interface SubTask {
	title: string;
	isCompleted: boolean;
}

export interface Task {
	title: string;
	description: string;
	status: string;
}

export interface Board {
	name: string;
	columns: {
		name: string;
		tasks: Task[];
	};
}

interface Column {
    name: string
}

export interface BoardItem {
	title: string;
	columns: Column[];
}

export interface ItemToDelete {
	id: string;
	name: string;
	type: string;
}
