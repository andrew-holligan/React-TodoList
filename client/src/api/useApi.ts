import { SuccessResponse, ErrorResponse } from "../../../shared/types/api.ts";

export async function useApi<T>({
	path,
	method,
	body,
	query,
}: {
	path: string;
	method: "GET" | "POST" | "PUT" | "DELETE";
	body?: any;
	query?: Record<string, string>;
}): Promise<SuccessResponse<T> | ErrorResponse> {
	try {
		return await fetch(path + new URLSearchParams(query || undefined), {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then((res) => {
			if (res.ok) {
				return <SuccessResponse<T>>{
					data: res.json(),
					success: true,
				};
			} else {
				return <ErrorResponse>{
					reason: res.statusText,
					success: false,
				};
			}
		});
	} catch (error: any) {
		console.error(error);

		return <ErrorResponse>{
			reason: error.message,
			success: false,
		};
	}
}
