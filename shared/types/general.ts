export interface Item {
	value: string;
	ticked: boolean;
}

export interface TodoList {
	_id: string;
	name: string;
	items: Item[];
}
