import { useApi } from "../useApi.ts";

export async function usePutItemTick(
	id: string,
	index: number,
	ticked: boolean
) {
	console.log(
		`PUT /api/putItemTick { id: ${id}, index: ${index}, ticked: ${ticked} }`
	);

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

	if (!res.success) {
		console.error(res.reason);
	}

	return res;
}
