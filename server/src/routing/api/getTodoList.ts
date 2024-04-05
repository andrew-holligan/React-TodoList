import { Router } from "express";
import { AddToSetOperators, ObjectId } from "mongodb";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { TodoList } from "../../../../shared/types/general";
import { db } from "../../index";

const getTodoList = Router();

getTodoList.get("/getTodoList", async (req, res) => {
	console.log("GET /api/getTodoList");

	const id = req.query.id;

	if (typeof id !== "string") {
		console.error("Invalid query parameters");
		res.status(400).json(<ErrorResponse>{
			reason: "Invalid query parameters",
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
	const identifier = { _id: ObjectId.createFromHexString(id) };
	const collection = db.getCollection(
		client.client,
		process.env.MONGODB_TODOLIST_COLLECTION_NAME!
	);
	const result = await collection.findOne(identifier);

	if (!result) {
		console.error("TodoList not found");
		res.status(404).json(<ErrorResponse>{
			reason: "TodoList not found",
			success: false,
		});
		return;
	}

	client.client.close();

	res.status(200).json(<SuccessResponse<TodoList>>{
		data: <TodoList>(<unknown>result),
		success: true,
	});
});

export default getTodoList;
