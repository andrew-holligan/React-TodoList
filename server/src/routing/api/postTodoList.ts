import { Router, Response } from "express";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { auth, RequestWithJWT } from "../auth/auth";
import { db } from "../../index";

function isValidItem(item: any): boolean {
	if (
		typeof item !== "object" ||
		typeof item.value !== "string" ||
		typeof item.ticked !== "boolean"
	) {
		return false;
	}
	return true;
}

const postTodoList = Router();

postTodoList.post(
	"/postTodoList",
	auth,
	async (req: RequestWithJWT, res: Response) => {
		console.log("POST /api/postTodoList");

		const { name, items } = req.body;

		if (
			typeof name !== "string" ||
			!Array.isArray(items) ||
			!items.every(isValidItem) ||
			items.length === 0
		) {
			console.error("Invalid TodoList data");
			res.status(400).json(<ErrorResponse>{
				reason: "Invalid TodoList data",
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
		const collection = db.getCollection(
			client,
			process.env.MONGODB_TODOLIST_COLLECTION_NAME!
		);

		// VALIDATION
		const result = await collection.findOne({
			uid: req.userId,
			name: name,
		});
		if (result) {
			console.error("TodoList with that name already exists");
			res.status(400).json(<ErrorResponse>{
				reason: "TodoList with that name already exists",
				success: false,
			});
			return;
		}

		await collection.insertOne({ uid: req.userId, name, items });

		client.close();

		res.status(200).json(<SuccessResponse<boolean>>{
			data: true,
			success: true,
		});
	}
);

export default postTodoList;
