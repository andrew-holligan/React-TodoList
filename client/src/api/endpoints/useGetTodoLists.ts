import { useApi } from "../fetch.ts";
import { TodoList } from "../../../../shared/types/general.ts";

export async function useGetTodoLists() {
	const res = await useApi<TodoList[]>({
		path: "/api/getTodoLists",
		method: "GET",
	});

	if (res.success) {
		console.log("GET /api/getTodoLists");
		return res.data;
	} else {
		throw new Error(res.reason);
	}
}
