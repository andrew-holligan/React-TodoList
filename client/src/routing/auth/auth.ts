import { useApi } from "../useApi.ts";

export async function auth() {
	console.log("GET /auth/");

	const res = await useApi<boolean>({
		path: "/auth/",
		method: "GET",
	});

	if (!res.success) {
		console.error(res.reason);
	}

	return res;
}
