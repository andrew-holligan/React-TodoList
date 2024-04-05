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
		const url = new URL(`${import.meta.env.VITE_APP_URL}${path}`);
		url.search = new URLSearchParams(query || undefined).toString();

		return await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then(async (res) => {
			const data = await res.json();
			if (res.ok) {
				return <SuccessResponse<T>>data;
			}
			return <ErrorResponse>data;
		});
	} catch (error: any) {
		console.error(error);

		return <ErrorResponse>{
			reason: error.message,
			success: false,
		};
	}
}
