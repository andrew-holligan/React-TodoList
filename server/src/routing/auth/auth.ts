import jwt from "jsonwebtoken";

import { ErrorResponse } from "../../../../shared/types/api";
import { Request, Response, NextFunction } from "express";

export interface RequestWithJWT extends Request {
	userId: string;
	username: string;
	iat: number;
	exp: number;
}

export const auth = (
	req: RequestWithJWT,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.token;

	if (!token) {
		console.error("No token provided");
		res.status(400).json(<ErrorResponse>{
			reason: "You are not authenticated",
			success: false,
		});
		return;
	}

	try {
		const decoded = <RequestWithJWT>(
			jwt.verify(token, process.env.JWT_SECRET!)
		);

		req.userId = decoded.userId;
		req.username = decoded.username;
		req.iat = decoded.iat;
		req.exp = decoded.exp;

		next();
	} catch (err) {
		console.error("Invalid token provided");
		res.status(400).json(<ErrorResponse>{
			reason: "You are not authenticated",
			success: false,
		});
	}
};
