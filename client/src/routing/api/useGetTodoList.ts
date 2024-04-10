import { useApi } from "../useApi.ts";
import { TodoList } from "../../../../shared/types/todolist.ts";

export async function useGetTodoList(id: string) {
	console.log(`GET /api/getTodoList { id: ${id} }`);

	const res = await useApi<TodoList>({
		path: "/api/getTodoList",
		method: "GET",
		query: { id: id },
	});

	if (!res.success) {
		console.error(res.reason);
	}

	return res;
}
