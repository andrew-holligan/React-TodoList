import { Router } from "express";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
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

postTodoList.post("/postTodoList", async (req, res) => {
	console.log("POST /api/postTodoList");

	const { name, items } = req.body;

	if (
		typeof name !== "string" ||
		!Array.isArray(items) ||
		!items.every(isValidItem)
	) {
		console.error("Invalid TodoList data");
		res.status(400).json({
			reason: "Invalid TodoList data",
			success: false,
		} as ErrorResponse);
		return;
	}

	const client = await db.getClient();

	if (!client.connected) {
		console.error("Database client failed to connect");
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
