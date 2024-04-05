import { useApi } from "../useApi.ts";
import { TodoList } from "../../../../shared/types/general.ts";

export async function useGetTodoLists() {
	console.log("GET /api/getTodoLists");

	const res = await useApi<TodoList[]>({
		path: "/api/getTodoLists",
		method: "GET",
	});

	if (!res.success) {
		console.error(res.reason);
	}

	return res;
}
