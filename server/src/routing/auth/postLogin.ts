import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { db } from "../../index";

const postLogin = Router();

postLogin.post("/postLogin", async (req: Request, res: Response) => {
	console.log("GET /auth/postLogin");

	const { username, password } = req.body;

	if (!username || !password) {
		console.error("Username and password are required");
		res.status(400).json(<ErrorResponse>{
			reason: "Username and password are required",
			success: false,
		});
		return;
	}

	if (typeof username !== "string" || typeof password !== "string") {
		console.error("Username and password must be strings");
		res.status(400).json(<ErrorResponse>{
			reason: "Username and password must be strings",
			success: false,
		});
		return;
	}

	const client = await db.getClient();

	if (!client.connected) {
		console.error("Database client failed to connect");
		res.status(500).json(<ErrorResponse>{
			reason: "Database client failed to connect",
			success: false,
		});
		return;
	}

	// DB CODE
	const collection = db.getCollection(
		client.client,
		process.env.MONGODB_USER_COLLECTION_NAME!
	);

	// VALIDATION
	const result = await collection.findOne({ username: username });
	if (!result) {
		console.error("User with that name doesn't exist");
		res.status(400).json(<ErrorResponse>{
			reason: "User with that name doesn't exist",
			success: false,
		});
		return;
	}

	client.client.close();

	// COMPARE PASSWORDS
	const match = await bcrypt.compare(password, result.password);

	if (!match) {
		console.error("Password is incorrect");
		res.status(400).json(<ErrorResponse>{
			reason: "Password is incorrect",
			success: false,
		});
		return;
	}

	// JWT
	const token = jwt.sign(
		{ userId: result._id, username: username },
		process.env.JWT_SECRET!,
		{ expiresIn: "24h" }
	);

	res.cookie("token", token, {
		httpOnly: true,
		sameSite: "none",
		maxAge: 24 * 60 * 60 * 1000,
		secure: true,
	})
		.status(200)
		.json(<SuccessResponse<boolean>>{
			data: true,
			success: true,
		});
});

export default postLogin;
