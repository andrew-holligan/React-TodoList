import { useApi } from "../useApi.ts";

export async function useDeleteItem(id: string, index: number) {
	console.log(`DELETE /api/deleteItem { id: ${id}, index: ${index} }`);

	const res = await useApi<boolean>({
		path: "/api/deleteItem",
		method: "DELETE",
		query: { id: id, index: `${index}` },
	});

	if (!res.success) {
		console.error(res.reason);
	}

	return res;
}
