import { Router, Response } from "express";
import { ObjectId } from "mongodb";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { auth, RequestWithJWT } from "../auth/auth";
import { db } from "../../index";

const putTodoListName = Router();

putTodoListName.put(
	"/putTodoListName",
	auth,
	async (req: RequestWithJWT, res: Response) => {
		console.log("PUT /api/putTodoListName");

		const id = req.query.id;
		const { name } = req.body;

		if (typeof id !== "string") {
			console.error("Invalid query parameters");
			res.status(400).json(<ErrorResponse>{
				reason: "Invalid query parameters",
				success: false,
			});
			return;
		}

		if (typeof name !== "string") {
			console.error("Invalid body parameters");
			res.status(400).json(<ErrorResponse>{
				reason: "Invalid body parameters",
				success: false,
			});
			return;
		}

		const client = await db.getClient();

		if (!client) {
			console.error("Database client failed to connect");
			res.status(500).json(<ErrorResponse>{
				reason: "Internal server error",
				success: false,
			});
			return;
		}

		// DB CODE
		const identifier = {
			_id: ObjectId.createFromHexString(id),
			uid: req.userId,
		};
		const collection = db.getCollection(
			client,
			process.env.MONGODB_TODOLIST_COLLECTION_NAME!
		);
		await collection.updateOne(identifier, {
			$set: { name: name },
		});

		client.close();

		res.status(200).json(<SuccessResponse<boolean>>{
			data: true,
			success: true,
		});
	}
);

export default putTodoListName;
