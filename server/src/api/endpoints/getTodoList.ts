import { Router } from "express";
import { ObjectId } from "mongodb";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { TodoList } from "../../../../shared/types/general";
import { db } from "../../index";

const getTodoList = Router();

getTodoList.get("/getTodoList", async (req, res) => {
	const id = req.query.id;

	if (typeof id !== "string") {
		res.status(400).json({
			reason: "Invalid query parameters",
			success: false,
		} as ErrorResponse);
		return;
	}

	const client = await db.getClient();

	if (!client.connected) {
		res.status(500).json({
			reason: "Database client failed to connect",
			success: false,
		} as ErrorResponse);
		return;
	}

	// DB CODE
	const identifier = { _id: ObjectId.createFromHexString(id) };
	const collection = db.getCollection(client.client);
	const result = await collection.findOne(identifier);

	if (!result) {
		res.status(404).json({
			reason: "TodoList not found",
			success: false,
		} as ErrorResponse);
		return;
	}

	client.client.close();

	res.status(200).json({
		data: result as unknown as TodoList,
		success: true,
	} as SuccessResponse<TodoList>);
});

export default getTodoList;
