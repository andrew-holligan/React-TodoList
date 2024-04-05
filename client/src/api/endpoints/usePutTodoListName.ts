import { useApi } from "../useApi.ts";

export async function usePutTodoListName(id: string, name: string) {
	console.log(`PUT /api/putTodoListName { id: ${id}, name: ${name} }`);

	const res = await useApi<boolean>({
		path: "/api/putTodoListName",
		method: "PUT",
		body: {
			name,
		},
		query: {
			id: id,
		},
	});

	if (!res.success) {
		console.error(res.reason);
	}

	return res;
}
