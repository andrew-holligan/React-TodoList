import { useApi } from "../useApi.ts";
import { Item } from "../../../../shared/types/general.ts";

export async function usePostTodoList(name: string, items: Item[]) {
	const res = await useApi<boolean>({
		path: "/api/postTodoList",
		method: "POST",
		body: {
			name,
			items,
		},
	});

	if (res.success) {
		console.log(
			`POST /api/postTodoList { name: ${name}, items: ${items} }`
		);
		return res.data;
	} else {
		throw new Error(res.reason);
	}
}
