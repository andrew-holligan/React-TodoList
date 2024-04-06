import { useApi } from "../useApi";

export async function useAuth() {
	console.log("GET /auth/");

	return await useApi<string>({
		path: "/auth/",
		method: "GET",
	});
}
