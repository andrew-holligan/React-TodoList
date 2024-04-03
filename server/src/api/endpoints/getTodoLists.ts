import { Router } from "express";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { TodoList } from "../../../../shared/types/general";
import { db } from "../../index";

const getTodoLists = Router();

getTodoLists.get("/getTodoLists", async (req, res) => {
	const client = await db.getClient();

	if (!client.connected) {
		res.status(500).json({
			reason: "Database client failed to connect",
			success: false,
		} as ErrorResponse);
		return;
	}

	// DB CODE
	const collection = db.getCollection(client.client);
	const result = await collection.find({}).toArray();

	client.client.close();

	res.status(200).json({
		data: result as unknown as TodoList[],
		success: true,
	} as SuccessResponse<TodoList[]>);
});

export default getTodoLists;
