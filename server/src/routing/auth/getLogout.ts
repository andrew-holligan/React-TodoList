import { Router } from "express";

import { SuccessResponse } from "../../../../shared/types/api";
import { auth } from "./auth";

const getLogout = Router();

getLogout.get("/getLogout", auth, async (req, res) => {
	console.log("GET /auth/getLogout");

	res.clearCookie("token")
		.status(200)
		.json(<SuccessResponse<boolean>>{
			data: true,
			success: true,
		});
});

export default getLogout;
