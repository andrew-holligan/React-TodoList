import { Router, Response } from "express";

import { SuccessResponse } from "../../../../shared/types/api";
import { auth, RequestWithJWT } from "./auth";

const getLogout = Router();

getLogout.get(
	"/getLogout",
	auth,
	async (req: RequestWithJWT, res: Response) => {
		console.log("GET /auth/getLogout");

		res.clearCookie("token")
			.status(200)
			.json(<SuccessResponse<boolean>>{
				data: true,
				success: true,
			});
	}
);

export default getLogout;
