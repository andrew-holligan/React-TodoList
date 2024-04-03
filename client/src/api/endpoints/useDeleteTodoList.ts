import { useApi } from "../useApi.ts";

export async function useDeleteTodoList(id: string) {
	const res = await useApi<boolean>({
		path: "/api/deleteTodoList",
		method: "DELETE",
		query: { id: id },
	});

	if (res.success) {
		console.log(`DELETE /api/deleteTodoList { id: ${id} }`);
		return res.data;
	} else {
		throw new Error(res.reason);
	}
}
