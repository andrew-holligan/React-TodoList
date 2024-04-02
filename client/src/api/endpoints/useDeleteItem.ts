import { useApi } from "../fetch.ts";

export async function useDeleteItem(id: string, index: number) {
	const res = await useApi<boolean>({
		path: "/api/deleteItem",
		method: "DELETE",
		query: { id: id, index: `${index}` },
	});

	if (res.success) {
		console.log(`DELETE /api/deleteItem { id: ${id}, index: ${index} }`);
		return res.data;
	} else {
		throw new Error(res.reason);
	}
}
