import { useApi } from "../useApi.ts";

export async function usePostLogin(username: string, password: string) {
	console.log(
		`POST /auth/postLogin { username: ${username}, password: ${password} }`
	);

	const res = await useApi<boolean>({
		path: "/auth/postLogin",
		method: "POST",
		body: {
			username,
			password,
		},
	});

	if (!res.success) {
		console.error(res.reason);
	}

	return res;
}
