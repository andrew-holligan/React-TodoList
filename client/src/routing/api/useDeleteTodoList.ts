import { useApi } from "../useApi.ts";

export async function useDeleteTodoList(id: string) {
	console.log(`DELETE /api/deleteTodoList { id: ${id} }`);

	const res = await useApi<boolean>({
		path: "/api/deleteTodoList",
		method: "DELETE",
		query: { id: id },
	});

	if (!res.success) {
		console.error(res.reason);
	}

	return res;
}
