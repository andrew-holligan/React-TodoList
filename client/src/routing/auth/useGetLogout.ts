import { useApi } from "../useApi.ts";

export async function useGetLogout() {
	console.log("GET /auth/getLogout");

	const res = await useApi<boolean>({
		path: "/auth/getLogout",
		method: "GET",
	});

	if (!res.success) {
		console.error(res.reason);
	}

	return res;
}
