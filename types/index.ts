interface SubTask {
	title: string;
	isCompleted: boolean;
}

export interface Task {
	title: string;
	description: string;
	status: string;
	subtasks: SubTask[];
}

export interface Board {
	name: string;
	columns: {
        name: string;
		tasks: Task[];
	};
}
