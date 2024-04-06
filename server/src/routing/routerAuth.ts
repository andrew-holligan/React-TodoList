import { Router, Response } from "express";

import postLogin from "./auth/postLogin";
import postRegister from "./auth/postRegister";
import getLogout from "./auth/getLogout";
import { auth, RequestWithJWT } from "./auth/auth";

import { SuccessResponse } from "../../../shared/types/api";

const routerAuth = Router();

routerAuth.use(postLogin);
routerAuth.use(postRegister);
routerAuth.use(getLogout);

routerAuth.get("/", auth, async (req: RequestWithJWT, res: Response) => {
	console.log("GET /auth/");

	res.status(200).json(<SuccessResponse<string>>{
		data: req.username,
		success: true,
	});
});

export default routerAuth;
