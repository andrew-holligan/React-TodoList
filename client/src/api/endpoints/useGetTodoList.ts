import { useApi } from "../fetch.ts";
import { TodoList } from "../../../../shared/types/general.ts";

export async function useGetTodoList(id: string) {
	const res = await useApi<TodoList>({
		path: "/api/getTodoList",
		method: "GET",
		query: { id: id },
	});

	if (res.success) {
		console.log(`GET /api/getTodoList { id: ${id} }`);
		return res.data;
	} else {
		throw new Error(res.reason);
	}
}
