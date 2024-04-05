import { Router } from "express";
import { ObjectId } from "mongodb";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { db } from "../../index";

const postLogin = Router();

postLogin.get("/postLogin", async (req, res) => {
	console.log("GET /auth/postLogin");
});

export default postLogin;
