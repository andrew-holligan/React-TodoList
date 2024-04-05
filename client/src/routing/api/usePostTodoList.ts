import { useApi } from "../useApi.ts";
import { Item } from "../../../../shared/types/general.ts";

export async function usePostTodoList(name: string, items: Item[]) {
	console.log(`POST /api/postTodoList { name: ${name}, items: ${items} }`);

	const res = await useApi<boolean>({
		path: "/api/postTodoList",
		method: "POST",
		body: {
			name,
			items,
		},
	});

	if (!res.success) {
		console.error(res.reason);
	}

	return res;
}
