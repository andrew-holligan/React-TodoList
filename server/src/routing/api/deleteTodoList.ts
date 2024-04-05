import { Router } from "express";
import { ObjectId } from "mongodb";

import { SuccessResponse, ErrorResponse } from "../../../../shared/types/api";
import { db } from "../../index";

const deleteTodoList = Router();

deleteTodoList.delete("/deleteTodoList", async (req, res) => {
	console.log("DELETE /api/deleteTodoList");

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
	const collection = db.getCollection(client.client);
	await collection.deleteOne(identifier);

	client.client.close();

	res.status(200).json(<SuccessResponse<boolean>>{
		data: true,
		success: true,
	});
});

export default deleteTodoList;