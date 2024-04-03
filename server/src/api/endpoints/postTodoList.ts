import { Router } from "express";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { db } from "../../index";

function isValidItem(item: any): boolean {
	if (
		typeof item !== "object" ||
		typeof item.name !== "string" ||
		typeof item.completed !== "boolean"
	) {
		return false;
	}
	return true;
}

const postTodoList = Router();

postTodoList.post("/postTodoList", async (req, res) => {
	const { name, items } = req.body;

	if (
		typeof name !== "string" ||
		!Array.isArray(items) ||
		!items.every(isValidItem)
	) {
		res.status(400).json({
			reason: "Invalid TodoList data",
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
	const collection = db.getCollection(client.client);
	await collection.insertOne({ name, items });

	client.client.close();

	res.status(200).json({
		data: true,
		success: true,
	} as SuccessResponse<boolean>);
});

export default postTodoList;
