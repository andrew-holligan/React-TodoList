export interface SuccessResponse<T> {
	data: T;
	success: true;
}

export interface ErrorResponse {
	reason: string;
	success: false;
}
