import { Router } from "express";
import { ObjectId } from "mongodb";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { db } from "../../index";

const postRegister = Router();

postRegister.get("/postRegister", async (req, res) => {
	console.log("GET /auth/postRegister");
});

export default postRegister;
