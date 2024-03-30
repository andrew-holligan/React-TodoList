interface Item {
    value: string;
    ticked: boolean;
}

interface TodoList {
    _id: string;
    name: string;
    items: Item[];
}

export type { TodoList as TodoListType };
export type { Item as ItemType };