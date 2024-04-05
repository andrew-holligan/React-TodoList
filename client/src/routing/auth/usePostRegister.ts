import { useApi } from "../useApi.ts";

export async function usePostRegister(username: string, password: string) {
	console.log(
		`POST /auth/postRegister { username: ${username}, password: ${password} }`
	);

	const res = await useApi<boolean>({
		path: "/auth/postRegister",
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
