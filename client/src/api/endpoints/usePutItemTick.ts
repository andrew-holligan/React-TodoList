import { useApi } from "../fetch.ts";

export async function usePutItemTick(
	id: string,
	index: number,
	ticked: boolean
) {
	const res = await useApi<boolean>({
		path: "/api/putItemTick",
		method: "PUT",
		body: {
			ticked,
		},
		query: {
			id: id,
			index: `${index}`,
		},
	});

	if (res.success) {
		console.log(
			`PUT /api/putItemTick { id: ${id}, index: ${index}, ticked: ${ticked} }`
		);
		return res.data;
	} else {
		throw new Error(res.reason);
	}
}
