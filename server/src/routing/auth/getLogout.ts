import { Router } from "express";
import { ObjectId } from "mongodb";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { db } from "../../index";

const getLogout = Router();

getLogout.get("/getLogout", async (req, res) => {
	console.log("GET /auth/getLogout");
});

export default getLogout;
