export interface SubTask {
	id: string;
	title: string;
	isCompleted: boolean;
	user_id: string;
	board_id: string;
	column_id: string;
	task_id: string;
}

export interface Task {
	id: string;
	title: string;
	description: string;
	status: string;
	user_id: string;
	board_id: string;
}

export interface TaskWithSubtasks extends Task {
	subtasks: SubTask[];
}

export interface Board {
	id: string;
	title: string;
	columns: {
		id: string;
		name: string;
		tasks: TaskWithSubtasks[];
	}[];
}

export interface Column {
	name: string;
}

export interface BoardItem {
	id: string;
	title: string;
}

export interface ItemToDelete {
	id: string;
	name: string;
	type: string;
}

export interface Option {
	value: string;
	content: string;
}
