import { Router } from "express";

import postLogin from "./auth/postLogin";
import postRegister from "./auth/postRegister";
import getLogout from "./auth/getLogout";
import { auth } from "./auth/auth";

import { SuccessResponse } from "../../../shared/types/api";

const routerAuth = Router();

routerAuth.use(postLogin);
routerAuth.use(postRegister);
routerAuth.use(getLogout);

routerAuth.get("/", auth, async (req, res) => {
	console.log("GET /auth/");

	res.status(200).json(<SuccessResponse<boolean>>{
		data: true,
		success: true,
	});
});

export default routerAuth;
