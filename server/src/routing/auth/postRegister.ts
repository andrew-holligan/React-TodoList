import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { db } from "../../index";

const postRegister = Router();

postRegister.post("/postRegister", async (req: Request, res: Response) => {
	console.log("GET /auth/postRegister");

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
	if (result) {
		console.error("User with that name already exists");
		res.status(400).json(<ErrorResponse>{
			reason: "User with that name already exists",
			success: false,
		});
		return;
	}

	// HASH PASSWORD
	const salt = await bcrypt.genSalt(
		parseInt(process.env.BCRYPT_SALT_FACTOR!, 10)
	);
	const hashedPassword = await bcrypt.hash(password, salt);

	await collection.insertOne({
		username: username,
		password: hashedPassword,
	});

	client.client.close();

	res.status(200).json(<SuccessResponse<boolean>>{
		data: true,
		success: true,
	});
});

export default postRegister;
